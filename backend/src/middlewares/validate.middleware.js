import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // Extract all error messages
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  // Create a structured message for ApiError
  const errorMessage = errors.array().map(err => `${err.path}: ${err.msg}`).join(', ');

  throw new ApiError(400, `Validation Failed: ${errorMessage}`, extractedErrors);
};
