import { Router } from 'express';
import { getBookingStats } from '../controllers/booking.controller.js';
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// /stats is just an alias for /bookings/stats for global stats
router.get('/', verifyJWT, getBookingStats);
router.get('/bookings', verifyJWT, getBookingStats);

export default router;
