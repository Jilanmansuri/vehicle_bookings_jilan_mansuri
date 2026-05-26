import { Vehicle } from '../models/vehicle.model.js';
import { ApiError } from '../utils/ApiError.js';
import { buildQueryFilters, buildPaginateOptions } from '../utils/queryBuilder.js';

export const getVehiclesService = async (query) => {
  const filter = buildQueryFilters(query);
  const options = buildPaginateOptions(query);
  return await Vehicle.paginate(filter, options);
};

export const getVehicleByIdService = async (id) => {
  const vehicle = await Vehicle.findById(id).lean();
  if (!vehicle) throw new ApiError(404, 'Vehicle not found');
  return vehicle;
};

export const createVehicleService = async (data) => {
  return await Vehicle.create(data);
};

export const updateVehicleService = async (id, data) => {
  const vehicle = await Vehicle.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!vehicle) throw new ApiError(404, 'Vehicle not found');
  return vehicle;
};

export const deleteVehicleService = async (id) => {
  const vehicle = await Vehicle.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  if (!vehicle) throw new ApiError(404, 'Vehicle not found');
  return vehicle;
};
