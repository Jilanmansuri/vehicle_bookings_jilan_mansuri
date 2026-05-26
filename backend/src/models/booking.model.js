import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const bookingSchema = new Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      index: true,
      enum: [
        'Success',
        'Canceled by Driver',
        'Canceled by Customer',
        'Driver Not Found',
        'Incomplete',
        'Pending' // for future use
      ],
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
      index: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
      default: null,
      index: true,
    },
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
      index: true,
    },
    pickupLocation: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    dropLocation: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    vTat: {
      type: Number,
      default: null, // Vehicle Turn Around Time in mins
    },
    cTat: {
      type: Number,
      default: null, // Customer Turn Around Time in mins
    },
    cancelReasonCustomer: {
      type: String,
      default: null,
    },
    cancelReasonDriver: {
      type: String,
      default: null,
    },
    incompleteRide: {
      type: String,
      default: 'No', // Usually Yes/No based on dataset
    },
    incompleteReason: {
      type: String,
      default: null,
    },
    fare: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    paymentMethod: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
      default: null,
    },
    distance: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    driverRating: {
      type: Number,
      default: null,
      min: 0,
      max: 5,
    },
    customerRating: {
      type: Number,
      default: null,
      min: 0,
      max: 5,
    },
    isDeleted: {
      type: Boolean,
      default: false, // Soft delete implementation
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster advanced querying
bookingSchema.index({ fare: 1, distance: 1 });
bookingSchema.index({ date: -1 });

bookingSchema.plugin(mongoosePaginate);

export const Booking = mongoose.model('Booking', bookingSchema);
