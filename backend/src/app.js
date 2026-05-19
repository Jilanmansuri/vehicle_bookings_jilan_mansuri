import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import { errorHandler } from './middlewares/error.middleware.js';
import { notFoundHandler } from './middlewares/error.middleware.js';
import indexRouter from './routes/index.js';

const app = express();

// Security HTTP headers
app.use(helmet());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Global rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter);

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true, // Allow sending cookies
  })
);

// Body parsers
app.use(express.json({ limit: '16kb' })); // Parse JSON payload
app.use(express.urlencoded({ extended: true, limit: '16kb' })); // Parse URL encoded data

// Cookie parser
app.use(cookieParser());

// API Routes
app.use('/api/v1', indexRouter);

// Handle 404
app.use(notFoundHandler);

// Centralized error handling
app.use(errorHandler);

export { app };
