import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const router = Router();

router.get('/verify', verifyJWT, (req, res) => {
  res.status(200).json(new ApiResponse(200, { user: req.user }, 'Token is valid'));
});

export default router;
