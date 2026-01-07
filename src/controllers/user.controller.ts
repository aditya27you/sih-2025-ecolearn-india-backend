import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { catchAsync } from '../utils/catchasync';

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getProfile(req.user._id!.toString());
  res.status(200).json({
    user,
  });
});

export const updateMe = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateProfile(
    req.user._id!.toString(),
    req.body,
  );
  res.status(200).json(user);
});
