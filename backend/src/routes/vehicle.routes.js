import { Router } from 'express';
import {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicle.controller.js';
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/')
  .get(getVehicles)
  .post(verifyJWT, isAdmin, createVehicle);

router.route('/:id')
  .get(getVehicleById)
  .put(verifyJWT, isAdmin, updateVehicle)
  .delete(verifyJWT, isAdmin, deleteVehicle);

export default router;
