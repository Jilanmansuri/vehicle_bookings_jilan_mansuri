import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { registerValidationRules, loginValidationRules } from '../validators/auth.validator.js';
import { authLimiter } from '../middlewares/rateLimiter.middleware.js';

const router = Router();

router.post('/register', authLimiter, registerValidationRules(), validate, registerUser);
router.post('/login', authLimiter, loginValidationRules(), validate, loginUser);

// Secured routes
router.post('/logout', verifyJWT, logoutUser);
router.get('/me', verifyJWT, getMe);

export default router;
