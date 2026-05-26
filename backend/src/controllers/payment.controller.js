import {
  getPaymentsService,
  getPaymentByIdService,
  createPaymentService,
  updatePaymentService,
  deletePaymentService,
} from '../services/payment.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getPayments = asyncHandler(async (req, res) => {
  const result = await getPaymentsService(req.query);
  return res.status(200).json(new ApiResponse(200, result, 'Payments fetched successfully'));
});

export const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await getPaymentByIdService(req.params.id);
  return res.status(200).json(new ApiResponse(200, payment, 'Payment fetched successfully'));
});

export const createPayment = asyncHandler(async (req, res) => {
  const payment = await createPaymentService(req.body);
  return res.status(201).json(new ApiResponse(201, payment, 'Payment created successfully'));
});

export const updatePayment = asyncHandler(async (req, res) => {
  const payment = await updatePaymentService(req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, payment, 'Payment updated successfully'));
});

export const deletePayment = asyncHandler(async (req, res) => {
  await deletePaymentService(req.params.id);
  return res.status(200).json(new ApiResponse(200, null, 'Payment deleted successfully'));
});
