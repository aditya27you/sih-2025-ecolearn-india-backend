import { Types } from 'mongoose';

export interface ILesson {
  _id?: Types.ObjectId;
  title: string;
  content: string;
  videoUrl?: string;
  moduleId: Types.ObjectId;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IModule {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  ecoPoints: number;
  lessons?: Types.ObjectId[]; // Array of Lesson references
  quiz?: Types.ObjectId; // Reference to Quiz
  createdBy: Types.ObjectId; // Admin ID
  createdAt?: Date;
  updatedAt?: Date;
}
