import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const activityLogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    action: {
      type: String,
      required: true,
      enum: ['Create', 'Update', 'Delete', 'Login', 'Logout', 'Failed_Login'],
      index: true,
    },
    entity: {
      type: String,
      required: true,
      enum: ['Booking', 'Vehicle', 'Customer', 'Driver', 'Payment', 'Location', 'User', 'System'],
      index: true,
    },
    details: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
activityLogSchema.index({ createdAt: -1 });

activityLogSchema.plugin(mongoosePaginate);

export const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
