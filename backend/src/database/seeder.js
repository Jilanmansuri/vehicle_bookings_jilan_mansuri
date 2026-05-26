import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { Customer } from '../models/customer.model.js';
import { Vehicle } from '../models/vehicle.model.js';
import { Driver } from '../models/driver.model.js';
import { Location } from '../models/location.model.js';
import { Payment } from '../models/payment.model.js';
import { Booking } from '../models/booking.model.js';
import { Rating } from '../models/rating.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const cleanField = (val) => {
  if (val === 'null' || val === null || val === undefined || val === '') return null;
  if (val === '#NAME?') return null; // Handle Excel broken formula strings
  return val;
};

const importData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully!');

    // 1. Analyze the dataset & 3. Clean and normalize field names
    const dataPath = path.resolve(__dirname, '../../data/bookings.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const bookingsData = JSON.parse(rawData);

    console.log(`Successfully loaded ${bookingsData.length} records. Processing...`);

    // We will clear existing collections to prevent duplication issues during seeding
    await Booking.deleteMany();
    await Customer.deleteMany();
    await Vehicle.deleteMany();
    await Driver.deleteMany();
    await Location.deleteMany();
    await Payment.deleteMany();
    await Rating.deleteMany();
    console.log('Cleared existing collections for fresh import.');

    // 6. Split dataset into proper collections
    const customersMap = new Map();
    const vehiclesMap = new Map();
    const locationsMap = new Map();
    const paymentsMap = new Map();

    bookingsData.forEach((row) => {
      // Clean up weird invisible characters in keys
      const dateKey = Object.keys(row).find(key => key.includes('Date'));
      const dateVal = row[dateKey];
      row.cleanedDate = cleanField(dateVal);

      // Customer
      const customerId = cleanField(row['Customer_ID']);
      const customerRating = cleanField(row['Customer_Rating']);
      if (customerId && !customersMap.has(customerId)) {
        customersMap.set(customerId, {
          customerId,
          averageRating: customerRating ? Number(customerRating) : 0,
        });
      }

      // Vehicle
      const vType = cleanField(row['Vehicle_Type']);
      const vImage = cleanField(row['Vehicle Images']);
      if (vType && !vehiclesMap.has(vType)) {
        vehiclesMap.set(vType, { type: vType, imageName: vImage });
      }

      // Location
      const pLoc = cleanField(row['Pickup_Location']);
      const dLoc = cleanField(row['Drop_Location']);
      if (pLoc && !locationsMap.has(pLoc)) locationsMap.set(pLoc, { name: pLoc });
      if (dLoc && !locationsMap.has(dLoc)) locationsMap.set(dLoc, { name: dLoc });

      // Payment
      const pMethod = cleanField(row['Payment_Method']);
      if (pMethod && !paymentsMap.has(pMethod)) {
        paymentsMap.set(pMethod, { method: pMethod });
      }
    });

    // 8. Handle duplicate records safely (by extracting unique values using Map/Set, duplicates are already handled)
    console.log(`Extracted: ${customersMap.size} Customers, ${vehiclesMap.size} Vehicles, ${locationsMap.size} Locations, ${paymentsMap.size} Payments`);

    // 7. Insert data using insertMany()
    const createdCustomers = await Customer.insertMany(Array.from(customersMap.values()));
    const createdVehicles = await Vehicle.insertMany(Array.from(vehiclesMap.values()));
    const createdLocations = await Location.insertMany(Array.from(locationsMap.values()));
    const createdPayments = await Payment.insertMany(Array.from(paymentsMap.values()));

    // Generating Mock Drivers (since Driver_ID is missing from JSON)
    const mockDrivers = Array.from({ length: 50 }, (_, i) => ({
      driverId: `DRV${(i + 1).toString().padStart(3, '0')}`,
      name: `Driver ${i + 1}`,
      averageRating: 4.5
    }));
    const createdDrivers = await Driver.insertMany(mockDrivers);

    // Build lookup tables
    const cLookup = new Map(createdCustomers.map(c => [c.customerId, c._id]));
    const vLookup = new Map(createdVehicles.map(v => [v.type, v._id]));
    const lLookup = new Map(createdLocations.map(l => [l.name, l._id]));
    const pLookup = new Map(createdPayments.map(p => [p.method, p._id]));

    const transformedBookings = [];
    const transformedRatings = [];

    // 4. Create proper MongoDB-ready structure (ObjectIds)
    bookingsData.forEach((row, index) => {
      const bookingId = cleanField(row['Booking_ID']);
      if (!bookingId) return; // Skip if no booking ID

      const pLoc = cleanField(row['Pickup_Location']);
      const dLoc = cleanField(row['Drop_Location']);
      const cId = cleanField(row['Customer_ID']);
      const vType = cleanField(row['Vehicle_Type']);
      const pMethod = cleanField(row['Payment_Method']);
      
      const status = cleanField(row['Booking_Status']);
      let driverObjId = null;
      if (status !== 'Driver Not Found' && createdDrivers.length > 0) {
        driverObjId = createdDrivers[index % createdDrivers.length]._id;
      }

      // 2. Match dataset fields with existing mongoose models
      const bookingDoc = {
        bookingId,
        date: new Date(row.cleanedDate),
        time: cleanField(row['Time']),
        status,
        customer: cLookup.get(cId),
        driver: driverObjId,
        vehicle: vLookup.get(vType),
        pickupLocation: lLookup.get(pLoc),
        dropLocation: lLookup.get(dLoc),
        vTat: cleanField(row['V_TAT']) ? Number(cleanField(row['V_TAT'])) : null,
        cTat: cleanField(row['C_TAT']) ? Number(cleanField(row['C_TAT'])) : null,
        cancelReasonCustomer: cleanField(row['Canceled_Rides_by_Customer']),
        cancelReasonDriver: cleanField(row['Canceled_Rides_by_Driver']),
        incompleteRide: cleanField(row['Incomplete_Rides']) || 'No',
        incompleteReason: cleanField(row['Incomplete_Rides_Reason']),
        fare: cleanField(row['Booking_Value']) ? Number(cleanField(row['Booking_Value'])) : 0,
        paymentMethod: pMethod ? pLookup.get(pMethod) : null,
        distance: cleanField(row['Ride_Distance']) ? Number(cleanField(row['Ride_Distance'])) : 0,
        driverRating: cleanField(row['Driver_Ratings']) ? Number(cleanField(row['Driver_Ratings'])) : null,
        customerRating: cleanField(row['Customer_Rating']) ? Number(cleanField(row['Customer_Rating'])) : null,
      };

      // Assign an ObjectID explicitly so we can create the rating linked to it
      const bookingObjectId = new mongoose.Types.ObjectId();
      bookingDoc._id = bookingObjectId;

      transformedBookings.push(bookingDoc);

      // Extract independent Rating collection record
      if (bookingDoc.driverRating || bookingDoc.customerRating) {
        transformedRatings.push({
          bookingId: bookingObjectId,
          driverRating: bookingDoc.driverRating,
          customerRating: bookingDoc.customerRating
        });
      }
    });

    console.log(`Inserting ${transformedBookings.length} Bookings in batches...`);
    
    // Batch insert bookings and ratings
    const batchSize = 3000;
    for (let i = 0; i < transformedBookings.length; i += batchSize) {
      await Booking.insertMany(transformedBookings.slice(i, i + batchSize));
      console.log(`Inserted Bookings up to ${i + batchSize}`);
    }

    for (let i = 0; i < transformedRatings.length; i += batchSize) {
      await Rating.insertMany(transformedRatings.slice(i, i + batchSize));
    }

    console.log('✅ All data inserted successfully');

    // 9. Generate sample transformed JSON
    const sampleOutput = transformedBookings[0];
    const samplePath = path.resolve(__dirname, '../../data/sample-transformed.json');
    fs.writeFileSync(samplePath, JSON.stringify(sampleOutput, null, 2));
    console.log(`Sample transformed JSON saved to ${samplePath}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Data Import Failed:', error);
    process.exit(1);
  }
};

importData();
