import {
  getBookingsService,
  getBookingByIdService,
  createBookingService,
  updateBookingService,
  deleteBookingService,
  getBookingStatsService,
  getRecentBookingsService,
  getTopBookingsService,
  getTrendingBookingsService,
  compareBookingsService,
  getRandomBookingsService,
} from '../services/booking.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';
import { logActivity } from '../services/activity.service.js';

export const getBookings = asyncHandler(async (req, res) => {
  const result = await getBookingsService(req.query);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        docs: result.docs,
        totalDocs: result.totalDocs,
        limit: result.limit,
        page: result.page,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
      },
      'Bookings fetched successfully'
    )
  );
});

export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await getBookingByIdService(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, booking, 'Booking fetched successfully'));
});

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await createBookingService(req.body);

  if (req.user) {
    await logActivity({
      userId: req.user._id,
      action: 'Create',
      entity: 'Booking',
      details: `Created new booking with ID ${booking.bookingId || booking._id}`,
      ipAddress: req.ip,
    });
  }

  return res
    .status(201)
    .json(new ApiResponse(201, booking, 'Booking created successfully'));
});

export const updateBooking = asyncHandler(async (req, res) => {
  const booking = await updateBookingService(req.params.id, req.body);

  if (req.user) {
    await logActivity({
      userId: req.user._id,
      action: 'Update',
      entity: 'Booking',
      details: `Updated booking ${req.params.id}`,
      ipAddress: req.ip,
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, booking, 'Booking updated successfully'));
});

export const deleteBooking = asyncHandler(async (req, res) => {
  await deleteBookingService(req.params.id);

  if (req.user) {
    await logActivity({
      userId: req.user._id,
      action: 'Delete',
      entity: 'Booking',
      details: `Soft deleted booking ${req.params.id}`,
      ipAddress: req.ip,
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Booking deleted successfully'));
});

export const getBookingStats = asyncHandler(async (req, res) => {
  const stats = await getBookingStatsService();

  return res
    .status(200)
    .json(new ApiResponse(200, stats, 'Booking statistics fetched successfully'));
});

export const getRecentBookings = asyncHandler(async (req, res) => {
  const bookings = await getRecentBookingsService(req.query.limit);
  return res.status(200).json(new ApiResponse(200, bookings, 'Recent bookings fetched successfully'));
});

export const getTopBookings = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const bookings = await getTopBookingsService(req.query.limit, category);
  return res.status(200).json(new ApiResponse(200, bookings, 'Top bookings fetched successfully'));
});

export const getRandomBookings = asyncHandler(async (req, res) => {
  const bookings = await getRandomBookingsService(req.query.limit);
  return res.status(200).json(new ApiResponse(200, bookings, 'Random bookings fetched successfully'));
});

export const getTrendingBookings = asyncHandler(async (req, res) => {
  const trending = await getTrendingBookingsService();
  return res.status(200).json(new ApiResponse(200, trending, 'Trending vehicles fetched successfully'));
});

export const compareBookings = asyncHandler(async (req, res) => {
  const { ids, booking1, booking2 } = req.query;
  
  let comparisonIds = ids;
  if (!comparisonIds) {
    if (booking1 && booking2) {
      comparisonIds = `${booking1},${booking2}`;
    } else {
      throw new ApiError(400, 'Please provide ids (?ids=id1,id2) or booking1 and booking2 parameters');
    }
  }

  const bookings = await compareBookingsService(comparisonIds);
  return res.status(200).json(new ApiResponse(200, bookings, 'Bookings compared successfully'));
});
