import { userRepository } from '../repositories/user.repository';
import { IUser } from '../types/user.types';
import { ApiError } from '../utils/apierror';

export class UserService {
  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    return user;
  }

  async updateProfile(userId: string, updateData: Partial<IUser>) {
    if (updateData.password) {
        throw new ApiError('This route is not for password updates.', 400);
    }

    const updatedUser = await userRepository.update(userId, updateData);
    if (!updatedUser) {
      throw new ApiError('User not found', 404);
    }
    return updatedUser;
  }
}

export const userService = new UserService();
