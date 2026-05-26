/**
 * Query Builder Utility
 * Automatically formats query strings for Mongoose filtering, sorting, and pagination
 */

export const buildQueryFilters = (query) => {
  const queryObj = { ...query };

  // Fields to exclude from standard matching (handled separately)
  const excludedFields = ['page', 'sort', 'limit', 'fields', 'keyword', 'distanceAbove', 'distanceBelow', 'minFare', 'maxFare', 'minRating', 'maxRating', 'customerRating', 'driverRating'];
  excludedFields.forEach((el) => delete queryObj[el]);

  // Advanced filtering operators conversion (gte, gt, lte, lt)
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g, (match) => `$${match}`);
  const filter = JSON.parse(queryStr);

  // Range and Special Filters for Bookings specifically

  if (query.minFare || query.maxFare) {
    filter.fare = {};
    if (query.minFare) filter.fare.$gte = Number(query.minFare);
    if (query.maxFare) filter.fare.$lte = Number(query.maxFare);
  }

  if (query.distanceAbove || query.distanceBelow) {
    filter.distance = {};
    if (query.distanceAbove) filter.distance.$gte = Number(query.distanceAbove);
    if (query.distanceBelow) filter.distance.$lte = Number(query.distanceBelow);
  }

  // Generic Rating bounds handling (assumes customerRating/driverRating if passed as exact numbers, or min/max overall)
  if (query.minRating || query.maxRating) {
    filter.$or = [
      {
        driverRating: {
          ...(query.minRating && { $gte: Number(query.minRating) }),
          ...(query.maxRating && { $lte: Number(query.maxRating) }),
        }
      },
      {
        customerRating: {
          ...(query.minRating && { $gte: Number(query.minRating) }),
          ...(query.maxRating && { $lte: Number(query.maxRating) }),
        }
      }
    ];
  }

  // Driver explicitly matching
  if (query.driverRating) {
    filter.driverRating = Number(query.driverRating);
  }
  
  // Customer explicitly matching
  if (query.customerRating) {
    filter.customerRating = Number(query.customerRating);
  }

  // Keyword Regex Search (Global or localized to specific string fields)
  // Usage: /search?keyword=Indiranagar
  if (query.keyword) {
    const searchRegex = new RegExp(query.keyword, 'i');
    
    // For models like Booking, text fields that are directly on the model:
    // Note: for relational fields (like location name), we must aggregate or lookup.
    // However, if we pass it dynamically, we might map it to specific scalar fields here.
    filter.$or = [
      { bookingId: searchRegex },
      { status: searchRegex },
      { cancelReasonCustomer: searchRegex },
      { cancelReasonDriver: searchRegex },
    ];
  }

  // Soft delete default
  if (filter.isDeleted === undefined) {
    filter.isDeleted = false;
  }

  return filter;
};

export const buildPaginateOptions = (query, defaultSort = '-createdAt') => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  
  // Sorting: /bookings?sort=-fare,distance
  let sort = defaultSort;
  if (query.sort) {
    sort = query.sort.split(',').join(' ');
  }

  return {
    page,
    limit,
    sort,
    lean: true, // For performance
  };
};
