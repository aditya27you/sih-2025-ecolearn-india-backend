import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apierror';
import { verifyToken } from '../utils/jwt';
import { catchAsync } from '../utils/catchasync';

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError('You are not logged in. Please log in to get access.', 401);
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    throw new ApiError('Invalid token or token has expired. Please log in again.', 401);
  }

  // Add user info to request object
  req.user = decoded;
  
  next();
});

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError('You do not have permission to perform this action', 403);
    }
    next();
  };
};
