import { Router } from 'express';
import healthRouter from './health.routes.js';

import authRouter from './auth.routes.js';
import bookingRouter from './booking.routes.js';
import customerRouter from './customer.routes.js';
import driverRouter from './driver.routes.js';
import vehicleRouter from './vehicle.routes.js';
import locationRouter from './location.routes.js';
import paymentRouter from './payment.routes.js';
import versionRouter from './version.routes.js';
import searchRouter from './search.routes.js';
import statsRouter from './stats.routes.js';
import jwtRouter from './jwt.routes.js';
import swaggerRouter from './swagger.routes.js';

const router = Router();

// Mount routes
router.use('/health', healthRouter);
router.use('/version', versionRouter);
router.use('/auth', authRouter);
router.use('/bookings', bookingRouter);
router.use('/customers', customerRouter);
router.use('/drivers', driverRouter);
router.use('/vehicles', vehicleRouter);
router.use('/locations', locationRouter);
router.use('/payments', paymentRouter);
router.use('/search', searchRouter);
router.use('/stats', statsRouter);
router.use('/jwt', jwtRouter);
router.use('/swagger', swaggerRouter);

export default router;
