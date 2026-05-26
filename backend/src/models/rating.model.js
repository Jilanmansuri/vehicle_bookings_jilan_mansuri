import mongoose, { Schema } from 'mongoose';

const ratingSchema = new Schema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    driverRating: {
      type: Number,
      min: 0,
      max: 5,
      default: null,
    },
    customerRating: {
      type: Number,
      min: 0,
      max: 5,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Rating = mongoose.model('Rating', ratingSchema);
