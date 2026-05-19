import { ApiError } from '../utils/ApiError.js';

/**
 * Handle 404 Not Found errors
 */
export const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
  next(error);
};

/**
 * Centralized Error Handling Middleware
 */
export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    // Convert generic Error to ApiError
    const statusCode = error.statusCode || mongoose?.Error ? 400 : 500;
    const message = error.message || 'Something went wrong';
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {}), // Add stack trace only in dev environment
  };

  return res.status(error.statusCode).json(response);
};
