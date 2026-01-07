import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { catchAsync } from '../utils/catchasync';

export const register = catchAsync(async (req: Request, res: Response) => {
  const { user, token } = await authService.register(req.body);
  res.status(201).json({
    token,
    user,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);
  res.status(200).json({
    token,
    user,
  });
});

export const forgotPassword = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.forgotPassword(req.body.email);
    res.status(200).json(result);
  },
);

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { token, password } = req.body;
  const result = await authService.resetPassword(token, password);
  res.status(200).json(result);
});
