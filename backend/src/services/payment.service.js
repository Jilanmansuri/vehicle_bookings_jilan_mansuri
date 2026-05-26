import { Payment } from '../models/payment.model.js';
import { ApiError } from '../utils/ApiError.js';
import { buildQueryFilters, buildPaginateOptions } from '../utils/queryBuilder.js';

export const getPaymentsService = async (query) => {
  const filter = buildQueryFilters(query);
  return await Payment.find(filter).lean();
};

export const getPaymentByIdService = async (id) => {
  const payment = await Payment.findById(id).lean();
  if (!payment) throw new ApiError(404, 'Payment not found');
  return payment;
};

export const createPaymentService = async (data) => {
  return await Payment.create(data);
};

export const updatePaymentService = async (id, data) => {
  const payment = await Payment.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!payment) throw new ApiError(404, 'Payment not found');
  return payment;
};

export const deletePaymentService = async (id) => {
  const payment = await Payment.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  if (!payment) throw new ApiError(404, 'Payment not found');
  return payment;
};
