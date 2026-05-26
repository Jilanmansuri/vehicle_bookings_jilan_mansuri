import { Router } from 'express';
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customer.controller.js';
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/')
  .get(getCustomers)
  .post(verifyJWT, isAdmin, createCustomer);

router.route('/:id')
  .get(getCustomerById)
  .put(verifyJWT, isAdmin, updateCustomer)
  .delete(verifyJWT, isAdmin, deleteCustomer);

export default router;
