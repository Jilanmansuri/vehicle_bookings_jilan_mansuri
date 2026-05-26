import { Router } from 'express';
import {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from '../controllers/location.controller.js';
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/')
  .get(getLocations)
  .post(verifyJWT, isAdmin, createLocation);

router.route('/:id')
  .get(getLocationById)
  .put(verifyJWT, isAdmin, updateLocation)
  .delete(verifyJWT, isAdmin, deleteLocation);

export default router;
