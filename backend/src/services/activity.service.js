import { ActivityLog } from '../models/activityLog.model.js';
import { buildQueryFilters, buildPaginateOptions } from '../utils/queryBuilder.js';

export const logActivity = async ({ userId, action, entity, details, ipAddress = null }) => {
  try {
    if (!userId) return; // Don't log if user is not identified
    await ActivityLog.create({
      user: userId,
      action,
      entity,
      details,
      ipAddress,
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

export const getActivityLogsService = async (query) => {
  const filter = buildQueryFilters(query);
  
  // Custom filter handling for activity logs
  if (query.action) filter.action = query.action;
  if (query.entity) filter.entity = query.entity;
  if (query.userId) filter.user = query.userId;

  const options = buildPaginateOptions(query, '-createdAt');
  options.populate = [{ path: 'user', select: 'name email role' }];

  return await ActivityLog.paginate(filter, options);
};
