import { Router } from 'express';
import {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from '../controllers/payment.controller.js';
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/')
  .get(getPayments)
  .post(verifyJWT, isAdmin, createPayment);

router.route('/:id')
  .get(getPaymentById)
  .put(verifyJWT, isAdmin, updatePayment)
  .delete(verifyJWT, isAdmin, deletePayment);

export default router;
