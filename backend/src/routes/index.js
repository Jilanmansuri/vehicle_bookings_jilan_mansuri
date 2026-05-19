import { Router } from 'express';
import healthRouter from './health.routes.js';

const router = Router();

// Mount routes
router.use('/health', healthRouter);

export default router;
