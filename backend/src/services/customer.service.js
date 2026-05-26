import { Customer } from '../models/customer.model.js';
import { ApiError } from '../utils/ApiError.js';
import { buildQueryFilters, buildPaginateOptions } from '../utils/queryBuilder.js';

export const getCustomersService = async (query) => {
  const filter = buildQueryFilters(query);
  const options = buildPaginateOptions(query);
  return await Customer.paginate(filter, options);
};

export const getCustomerByIdService = async (id) => {
  const customer = await Customer.findOne({ customerId: id }).lean();
  if (!customer) throw new ApiError(404, 'Customer not found');
  return customer;
};

export const createCustomerService = async (data) => {
  return await Customer.create(data);
};

export const updateCustomerService = async (id, data) => {
  const customer = await Customer.findOneAndUpdate({ customerId: id }, data, { new: true, runValidators: true });
  if (!customer) throw new ApiError(404, 'Customer not found');
  return customer;
};

export const deleteCustomerService = async (id) => {
  const customer = await Customer.findOneAndUpdate({ customerId: id }, { isDeleted: true }, { new: true });
  if (!customer) throw new ApiError(404, 'Customer not found');
  return customer;
};
