import { Types } from 'mongoose';

export interface IProgress {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  moduleId: string;
  completedLessons: string[];
  isCompleted: boolean;
  quizScore?: number;
  lastAccessed?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
