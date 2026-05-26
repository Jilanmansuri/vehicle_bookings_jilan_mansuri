import {
  getDriversService,
  getDriverByIdService,
  createDriverService,
  updateDriverService,
  deleteDriverService,
} from '../services/driver.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDrivers = asyncHandler(async (req, res) => {
  const result = await getDriversService(req.query);
  return res.status(200).json(new ApiResponse(200, result, 'Drivers fetched successfully'));
});

export const getDriverById = asyncHandler(async (req, res) => {
  const driver = await getDriverByIdService(req.params.id);
  return res.status(200).json(new ApiResponse(200, driver, 'Driver fetched successfully'));
});

export const createDriver = asyncHandler(async (req, res) => {
  const driver = await createDriverService(req.body);
  return res.status(201).json(new ApiResponse(201, driver, 'Driver created successfully'));
});

export const updateDriver = asyncHandler(async (req, res) => {
  const driver = await updateDriverService(req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, driver, 'Driver updated successfully'));
});

export const deleteDriver = asyncHandler(async (req, res) => {
  await deleteDriverService(req.params.id);
  return res.status(200).json(new ApiResponse(200, null, 'Driver deleted successfully'));
});
