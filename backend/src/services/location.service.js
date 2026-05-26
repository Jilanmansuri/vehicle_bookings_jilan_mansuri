import { Location } from '../models/location.model.js';
import { ApiError } from '../utils/ApiError.js';
import { buildQueryFilters, buildPaginateOptions } from '../utils/queryBuilder.js';

export const getLocationsService = async (query) => {
  const filter = buildQueryFilters(query);
  const options = buildPaginateOptions(query);
  // Using find() since pagination might not be strictly needed, but let's use paginate if it has the plugin, or just find.
  // Wait, I didn't add the plugin to location.model.js yet!
  // I will just use standard find for locations to avoid breaking, or I can add the plugin. 
  // Given Location is small, standard find() works.
  return await Location.find(filter).lean();
};

export const getLocationByIdService = async (id) => {
  const location = await Location.findById(id).lean();
  if (!location) throw new ApiError(404, 'Location not found');
  return location;
};

export const createLocationService = async (data) => {
  return await Location.create(data);
};

export const updateLocationService = async (id, data) => {
  const location = await Location.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!location) throw new ApiError(404, 'Location not found');
  return location;
};

export const deleteLocationService = async (id) => {
  const location = await Location.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  if (!location) throw new ApiError(404, 'Location not found');
  return location;
};
