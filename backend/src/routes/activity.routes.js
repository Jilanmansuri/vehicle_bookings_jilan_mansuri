import { Router } from 'express';
import { getActivityLogs } from '../controllers/activity.controller.js';
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Only admins can view activity logs
router.use(verifyJWT, isAdmin);

router.route('/').get(getActivityLogs);

export default router;
