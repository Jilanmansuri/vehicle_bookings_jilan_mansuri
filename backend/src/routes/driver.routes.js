import { Router } from 'express';
import {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
} from '../controllers/driver.controller.js';
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/')
  .get(getDrivers)
  .post(verifyJWT, isAdmin, createDriver);

router.route('/:id')
  .get(getDriverById)
  .put(verifyJWT, isAdmin, updateDriver)
  .delete(verifyJWT, isAdmin, deleteDriver);

export default router;
