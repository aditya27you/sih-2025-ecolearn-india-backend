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
    
    const token = signToken({ id: newUser._id, role: newUser.role });

    // Mongoose documents need toObject() to behave like plain objects for deletion
    // but TypeScript might complain if not cast or if toObject isn't on interface.
    // However, the model returns HydratedDocument<IUser> which has methods.
    // For simplicity in this step, I'll return the document and let controller handle formatting 
    // or just return it as is (password is select: false by default in queries, but create returns it).
    
    // Explicitly removing password from result if present
    const userResponse: any = newUser.toObject ? newUser.toObject() : { ...newUser };
    delete userResponse.password;

    return { user: userResponse, token };
  }

  async login(email: string, password: string) { // Corrected parameter order
    if (!email || !password) {
      throw new ApiError('Please provide email and password', 400);
    }

    const user = await userRepository.findByEmailWithPassword(email);

    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError('Incorrect email or password', 401);
    }

    const token = signToken({ id: user._id, role: user.role });
    
    // The user object here has password selected (because of +password). We must remove it.
    const userResponse: any = user.toObject ? user.toObject() : { ...user };
    delete userResponse.password;

    return { user: userResponse, token };
  }
}

export const authService = new AuthService();
