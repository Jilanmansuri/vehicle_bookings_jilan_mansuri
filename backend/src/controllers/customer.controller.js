import {
  getCustomersService,
  getCustomerByIdService,
  createCustomerService,
  updateCustomerService,
  deleteCustomerService,
} from '../services/customer.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getCustomers = asyncHandler(async (req, res) => {
  const result = await getCustomersService(req.query);
  return res.status(200).json(new ApiResponse(200, result, 'Customers fetched successfully'));
});

export const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await getCustomerByIdService(req.params.id);
  return res.status(200).json(new ApiResponse(200, customer, 'Customer fetched successfully'));
});

export const createCustomer = asyncHandler(async (req, res) => {
  const customer = await createCustomerService(req.body);
  return res.status(201).json(new ApiResponse(201, customer, 'Customer created successfully'));
});

export const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await updateCustomerService(req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, customer, 'Customer updated successfully'));
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  await deleteCustomerService(req.params.id);
  return res.status(200).json(new ApiResponse(200, null, 'Customer deleted successfully'));
});
