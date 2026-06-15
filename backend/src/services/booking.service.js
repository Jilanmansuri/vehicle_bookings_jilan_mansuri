import { Booking } from '../models/booking.model.js';
import { ApiError } from '../utils/ApiError.js';
import { buildQueryFilters, buildPaginateOptions } from '../utils/queryBuilder.js';
import mongoose from 'mongoose';
import { Vehicle } from '../models/vehicle.model.js';
import { Payment } from '../models/payment.model.js';
import { User } from '../models/user.model.js';
import { Driver } from '../models/driver.model.js';
import { Location } from '../models/location.model.js';

/**
 * Get all bookings with dynamic filters, sorting, and pagination
 */
export const getBookingsService = async (query) => {
  const filter = buildQueryFilters(query);

  // Handle string queries for references (e.g., vehicle=Bike, payment=Cash)
  if (query.vehicle && !mongoose.isValidObjectId(query.vehicle)) {
    const vehicleDoc = await Vehicle.findOne({ type: query.vehicle });
    if (vehicleDoc) filter.vehicle = vehicleDoc._id;
    else filter.vehicle = null; // No match
  }
  
  if (query.payment && !mongoose.isValidObjectId(query.payment)) {
    const paymentDoc = await Payment.findOne({ method: query.payment });
    if (paymentDoc) filter.paymentMethod = paymentDoc._id;
    else filter.paymentMethod = null;
    delete filter.payment; // since it mapped to paymentMethod
  }

  const options = buildPaginateOptions(query, '-date');

  // Populate references for rich response
  options.populate = [
    { path: 'customer', select: 'customerId averageRating name' },
    { path: 'driver', select: 'driverId name averageRating' },
    { path: 'vehicle', select: 'type imageName' },
    { path: 'pickupLocation', select: 'name' },
    { path: 'dropLocation', select: 'name' },
    { path: 'paymentMethod', select: 'method' },
  ];

  return await Booking.paginate(filter, options);
};

/**
 * Get single booking by ObjectId or custom bookingId
 */
export const getBookingByIdService = async (id) => {
  let query;
  if (mongoose.isValidObjectId(id)) {
    query = Booking.findById(id);
  } else {
    query = Booking.findOne({ bookingId: id });
  }

  const booking = await query.populate([
    { path: 'customer', select: 'customerId averageRating' },
    { path: 'vehicle', select: 'type' },
    { path: 'pickupLocation', select: 'name' },
    { path: 'dropLocation', select: 'name' },
    { path: 'paymentMethod', select: 'method' },
  ]).lean();

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  return booking;
};

/**
 * Create new booking
 */
export const createBookingService = async (data) => {
  // Auto-generate required fields if they are missing
  if (!data.bookingId) {
    data.bookingId = `BKG${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  
  const now = new Date();
  if (!data.date) {
    data.date = now;
  }
  if (!data.time) {
    data.time = now.toTimeString().split(' ')[0]; // "HH:MM:SS"
  }

  const booking = await Booking.create(data);
  return booking;
};

/**
 * Update existing booking
 */
export const updateBookingService = async (id, data) => {
  let query = mongoose.isValidObjectId(id) ? { _id: id } : { bookingId: id };

  const booking = await Booking.findOneAndUpdate(query, data, {
    new: true,
    runValidators: true,
  });

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  return booking;
};

/**
 * Soft delete a booking
 */
export const deleteBookingService = async (id) => {
  let query = mongoose.isValidObjectId(id) ? { _id: id } : { bookingId: id };

  const booking = await Booking.findOneAndUpdate(query, { isDeleted: true }, { new: true });

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  return booking;
};

/**
 * Get Aggregated Booking Statistics
 */
export const getBookingStatsService = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const startOfThisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const startOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);

  const stats = await Booking.aggregate([
    {
      $facet: {
        totals: [
          { $group: { _id: null, count: { $sum: 1 }, totalRevenue: { $sum: "$fare" } } }
        ],
        byStatus: [
          { $group: { _id: "$status", count: { $sum: 1 } } }
        ],
        topVehicles: [
          { $group: { _id: "$vehicle", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 3 },
          {
            $lookup: {
              from: 'vehicles',
              localField: '_id',
              foreignField: '_id',
              as: 'vehicleInfo'
            }
          },
          { $unwind: "$vehicleInfo" },
          { $project: { type: "$vehicleInfo.type", count: 1 } }
        ],
        revenueOverTime: [
          { $match: { date: { $gte: thirtyDaysAgo } } },
          { $group: { _id: { $dateToString: { format: "%m-%d", date: "$date" } }, revenue: { $sum: "$fare" }, bookings: { $sum: 1 } } },
          { $sort: { _id: 1 } }
        ],
        thisMonth: [
          { $match: { date: { $gte: startOfThisMonth } } },
          { $group: { _id: null, revenue: { $sum: "$fare" }, bookings: { $sum: 1 } } }
        ],
        lastMonth: [
          { $match: { date: { $gte: startOfLastMonth, $lt: startOfThisMonth } } },
          { $group: { _id: null, revenue: { $sum: "$fare" }, bookings: { $sum: 1 } } }
        ],
        topDriversList: [
          { $match: { driver: { $ne: null } } },
          { $group: { _id: "$driver", count: { $sum: 1 }, revenue: { $sum: "$fare" } } },
          { $sort: { revenue: -1 } },
          { $limit: 5 },
          {
            $lookup: {
              from: 'drivers',
              localField: '_id',
              foreignField: '_id',
              as: 'driverInfo'
            }
          },
          { $unwind: "$driverInfo" },
          { $project: { name: "$driverInfo.name", averageRating: "$driverInfo.averageRating", count: 1, revenue: 1 } }
        ]
      }
    }
  ]);

  const statsObj = stats[0];

  // Fetch counts from other collections
  const [totalUsers, totalVehicles, totalDrivers, totalLocations] = await Promise.all([
    User.countDocuments(),
    Vehicle.countDocuments(),
    Driver.countDocuments(),
    Location.countDocuments()
  ]);

  statsObj.entityCounts = {
    users: totalUsers,
    vehicles: totalVehicles,
    drivers: totalDrivers,
    locations: totalLocations
  };

  return statsObj;
};

/**
 * Get Recent Bookings
 */
export const getRecentBookingsService = async (limit = 5) => {
  return await Booking.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .populate([
      { path: 'customer', select: 'name customerId' },
      { path: 'vehicle', select: 'type' }
    ])
    .lean();
};

/**
 * Get Top Bookings (e.g., by highest fare, or lowest fare)
 */
export const getTopBookingsService = async (limit = 5, category = 'highest-fare') => {
  const sortOpt = category === 'lowest-fare' ? { fare: 1 } : { fare: -1 };
  return await Booking.find({ isDeleted: false })
    .sort(sortOpt)
    .limit(Number(limit))
    .populate([
      { path: 'customer', select: 'name customerId' },
      { path: 'vehicle', select: 'type' }
    ])
    .lean();
};

/**
 * Get Random Bookings
 */
export const getRandomBookingsService = async (limit = 5) => {
  return await Booking.aggregate([
    { $match: { isDeleted: false } },
    { $sample: { size: Number(limit) } },
    {
      $lookup: {
        from: 'customers',
        localField: 'customer',
        foreignField: '_id',
        as: 'customerData'
      }
    },
    {
      $lookup: {
        from: 'vehicles',
        localField: 'vehicle',
        foreignField: '_id',
        as: 'vehicleData'
      }
    },
    { $unwind: { path: '$customerData', preserveNullAndEmptyArrays: true } },
    { $unwind: { path: '$vehicleData', preserveNullAndEmptyArrays: true } },
  ]);
};

/**
 * Get Trending Bookings (e.g., Most requested vehicle types in last 30 days)
 */
export const getTrendingBookingsService = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const trending = await Booking.aggregate([
    { $match: { date: { $gte: thirtyDaysAgo }, isDeleted: false } },
    { $group: { _id: "$vehicle", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'vehicles',
        localField: '_id',
        foreignField: '_id',
        as: 'vehicleInfo'
      }
    },
    { $unwind: "$vehicleInfo" },
    { $project: { type: "$vehicleInfo.type", count: 1, image: "$vehicleInfo.imageName" } }
  ]);

  return trending;
};

/**
 * Compare Multiple Bookings by ID
 */
export const compareBookingsService = async (ids) => {
  const idsArray = ids.split(',');
  
  const query = idsArray.some(id => !mongoose.isValidObjectId(id)) 
    ? { bookingId: { $in: idsArray } }
    : { _id: { $in: idsArray } };

  const bookings = await Booking.find(query)
    .populate([
      { path: 'customer', select: 'name customerId' },
      { path: 'vehicle', select: 'type' },
      { path: 'pickupLocation', select: 'name' },
      { path: 'dropLocation', select: 'name' }
    ])
    .lean();

  if (bookings.length === 0) {
    throw new ApiError(404, 'No matching bookings found for comparison');
  }

  return bookings;
};
