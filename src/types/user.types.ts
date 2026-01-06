import { Types } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
  schoolId?: Types.ObjectId;
  grade?: number;
  ecoPoints: number;
  streak: number;
  avatar?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
