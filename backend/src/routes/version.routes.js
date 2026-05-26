import { Router } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json(
    new ApiResponse(200, {
      version: '1.0.0',
      description: 'Vehicle Booking Backend API',
    }, 'Version fetched successfully')
  );
});

export default router;
