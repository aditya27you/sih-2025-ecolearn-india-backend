import { IUser } from './user.types';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Temporarily any, will use IUser once model is defined
    }
  }
}
