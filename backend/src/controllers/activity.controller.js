import { getActivityLogsService } from '../services/activity.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getActivityLogs = asyncHandler(async (req, res) => {
  const result = await getActivityLogsService(req.query);

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
      'Activity logs fetched successfully'
    )
  );
});
