import {
  getLocationsService,
  getLocationByIdService,
  createLocationService,
  updateLocationService,
  deleteLocationService,
} from '../services/location.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getLocations = asyncHandler(async (req, res) => {
  const result = await getLocationsService(req.query);
  return res.status(200).json(new ApiResponse(200, result, 'Locations fetched successfully'));
});

export const getLocationById = asyncHandler(async (req, res) => {
  const location = await getLocationByIdService(req.params.id);
  return res.status(200).json(new ApiResponse(200, location, 'Location fetched successfully'));
});

export const createLocation = asyncHandler(async (req, res) => {
  const location = await createLocationService(req.body);
  return res.status(201).json(new ApiResponse(201, location, 'Location created successfully'));
});

export const updateLocation = asyncHandler(async (req, res) => {
  const location = await updateLocationService(req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, location, 'Location updated successfully'));
});

export const deleteLocation = asyncHandler(async (req, res) => {
  await deleteLocationService(req.params.id);
  return res.status(200).json(new ApiResponse(200, null, 'Location deleted successfully'));
});
