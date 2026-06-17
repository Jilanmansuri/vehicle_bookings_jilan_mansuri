import { Router } from 'express';
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingStats,
  getRecentBookings,
  getTopBookings,
  getTrendingBookings,
  compareBookings,
  getRandomBookings,
} from '../controllers/booking.controller.js';
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createBookingValidationRules } from '../validators/booking.validator.js';
import { bookingCreateLimiter } from '../middlewares/rateLimiter.middleware.js';

const router = Router();

// Specialized read routes (Must be above /:id)
router.get('/stats', verifyJWT, getBookingStats);
router.get('/recent', getRecentBookings);
router.get('/top', getTopBookings); // Will handle /top without params
router.get('/top/:category', getTopBookings); // Handle /top/lowest-fare
router.get('/trending', getTrendingBookings);
router.get('/compare', compareBookings);
router.get('/random', getRandomBookings);

// Generic dynamic query route for all combined querying/filtering/pagination/sorting
// Covers requirements like: ?status=Success&vehicle=Bike&sort=-fare&page=1
router.route('/')
  .get(getBookings)
  .post(verifyJWT, bookingCreateLimiter, createBookingValidationRules(), validate, createBooking);

router.route('/:id')
  .get(getBookingById)
  .put(verifyJWT, updateBooking)
  .delete(verifyJWT, isAdmin, deleteBooking);

export default router;
