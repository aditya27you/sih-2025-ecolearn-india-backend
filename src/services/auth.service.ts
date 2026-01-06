import { userRepository } from '../repositories/user.repository';
import { IUser } from '../types/user.types';
import { signToken } from '../utils/jwt';
import { ApiError } from '../utils/apierror';

export class AuthService {
  async register(userData: Partial<IUser>) {
    if (!userData.email || !userData.password || !userData.name) {
      throw new ApiError('Missing required fields', 400);
    }

    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ApiError('Email already registered', 400);
    }

    const newUser = await userRepository.create(userData);
    if (!newUser) {
      throw new ApiError('User creation failed', 500);
    }

    const token = signToken({ id: newUser._id, role: newUser.role });

    const { password, ...userResponse } = (newUser as any).toObject
      ? (newUser as any).toObject()
      : { ...newUser };

    return { user: userResponse, token };
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new ApiError('Please provide email and password', 400);
    }

    const user = await userRepository.findByEmailWithPassword(email);

    if (!user || !(await (user as any).comparePassword(password))) {
      throw new ApiError('Incorrect email or password', 401);
    }

    const token = signToken({ id: user._id, role: user.role });

    const { password: _, ...userResponse } = (user as any).toObject
      ? (user as any).toObject()
      : { ...user };

    return { user: userResponse, token };
  }
}

export const authService = new AuthService();
