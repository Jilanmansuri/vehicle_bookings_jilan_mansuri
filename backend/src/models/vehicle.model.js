import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const vehicleSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    imageName: {
      type: String,
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

vehicleSchema.plugin(mongoosePaginate);

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
