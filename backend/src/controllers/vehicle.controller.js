import {
  getVehiclesService,
  getVehicleByIdService,
  createVehicleService,
  updateVehicleService,
  deleteVehicleService,
} from '../services/vehicle.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getVehicles = asyncHandler(async (req, res) => {
  const result = await getVehiclesService(req.query);
  return res.status(200).json(new ApiResponse(200, result, 'Vehicles fetched successfully'));
});

export const getVehicleById = asyncHandler(async (req, res) => {
  const vehicle = await getVehicleByIdService(req.params.id);
  return res.status(200).json(new ApiResponse(200, vehicle, 'Vehicle fetched successfully'));
});

export const createVehicle = asyncHandler(async (req, res) => {
  const vehicle = await createVehicleService(req.body);
  return res.status(201).json(new ApiResponse(201, vehicle, 'Vehicle created successfully'));
});

export const updateVehicle = asyncHandler(async (req, res) => {
  const vehicle = await updateVehicleService(req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, vehicle, 'Vehicle updated successfully'));
});

export const deleteVehicle = asyncHandler(async (req, res) => {
  await deleteVehicleService(req.params.id);
  return res.status(200).json(new ApiResponse(200, null, 'Vehicle deleted successfully'));
});
