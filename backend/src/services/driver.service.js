import { Driver } from '../models/driver.model.js';
import { ApiError } from '../utils/ApiError.js';
import { buildQueryFilters, buildPaginateOptions } from '../utils/queryBuilder.js';

export const getDriversService = async (query) => {
  const filter = buildQueryFilters(query);
  const options = buildPaginateOptions(query);
  return await Driver.paginate(filter, options);
};

export const getDriverByIdService = async (id) => {
  const driver = await Driver.findOne({ driverId: id }).lean();
  if (!driver) throw new ApiError(404, 'Driver not found');
  return driver;
};

export const createDriverService = async (data) => {
  return await Driver.create(data);
};

export const updateDriverService = async (id, data) => {
  const driver = await Driver.findOneAndUpdate({ driverId: id }, data, { new: true, runValidators: true });
  if (!driver) throw new ApiError(404, 'Driver not found');
  return driver;
};

export const deleteDriverService = async (id) => {
  const driver = await Driver.findOneAndUpdate({ driverId: id }, { isDeleted: true }, { new: true });
  if (!driver) throw new ApiError(404, 'Driver not found');
  return driver;
};
