import mongoose, { Schema } from 'mongoose';

const paymentSchema = new Schema(
  {
    method: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
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

export const Payment = mongoose.model('Payment', paymentSchema);
