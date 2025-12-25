import { Request, Response } from 'express';
import { leaderboardService } from '../services/leaderboard.service';
import { catchAsync } from '../utils/catchasync';
import { ApiResponse } from '../utils/apiresponse';

export const getGlobalLeaderboard = catchAsync(async (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
  const leaderboard = await leaderboardService.getGlobalLeaderboard(limit);
  res.status(200).json(new ApiResponse(200, leaderboard, 'Global leaderboard fetched successfully'));
});

export const getSchoolLeaderboard = catchAsync(async (req: Request, res: Response) => {
  const { schoolId } = req.params;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
  const leaderboard = await leaderboardService.getSchoolLeaderboard(schoolId, limit);
  res.status(200).json(new ApiResponse(200, leaderboard, 'School leaderboard fetched successfully'));
});

export const getGradeLeaderboard = catchAsync(async (req: Request, res: Response) => {
  const grade = parseInt(req.params.grade);
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
  const leaderboard = await leaderboardService.getGradeLeaderboard(grade, limit);
  res.status(200).json(new ApiResponse(200, leaderboard, 'Grade leaderboard fetched successfully'));
});

export const getMyRank = catchAsync(async (req: Request, res: Response) => {
  const rank = await leaderboardService.getUserRank((req as any).user._id);
  res.status(200).json(new ApiResponse(200, { rank }, 'Your rank fetched successfully'));
});
