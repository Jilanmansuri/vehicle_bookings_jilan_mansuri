import rateLimit from 'express-rate-limit';
import { ApiError } from '../utils/ApiError.js';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs for auth routes
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  handler: (req, res, next, options) => {
    next(new ApiError(429, options.message));
  }
});

export const searchLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30, // Limit each IP to 30 search requests per windowMs
  message: 'Too many search requests from this IP, please try again later',
  handler: (req, res, next, options) => {
    next(new ApiError(429, options.message));
  }
});

export const bookingCreateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // Limit each IP to 10 booking creations per windowMs
  message: 'Too many bookings created from this IP, please try again later',
  handler: (req, res, next, options) => {
    next(new ApiError(429, options.message));
  }
});
