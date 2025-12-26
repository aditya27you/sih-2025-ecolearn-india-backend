import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apierror';
import { ZodError, ZodIssue } from 'zod';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  // Default values
  error.statusCode = error.statusCode || 500;
  error.message = error.message || 'Internal Server Error';

  // Zod Validation Error
  if (err instanceof ZodError) {
    const messages = err.issues.map((issue: ZodIssue) => `${issue.path.join('.')}: ${issue.message}`);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: messages,
    });
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(
      (val: any) => val.message
    );
    error = new ApiError('Validation Error', 400);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: messages,
    });
  }

  // Mongoose CastError (Invalid ObjectId)
  if (err.name === 'CastError') {
    error = new ApiError('Invalid ID format', 400);
  }

  // Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ApiError(`${field} already exists`, 409);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError('Invalid token. Please login again.', 401);
  }

  if (err.name === 'TokenExpiredError') {
    error = new ApiError('Token expired. Please login again.', 401);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
