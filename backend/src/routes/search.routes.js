import { Router } from 'express';
import { getBookings } from '../controllers/booking.controller.js';
import { searchLimiter } from '../middlewares/rateLimiter.middleware.js';

const router = Router();

// /search is just an alias for /bookings with the queryBuilder handling the keyword
router.get('/', searchLimiter, getBookings);

export default router;
