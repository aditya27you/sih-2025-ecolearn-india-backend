import { Types } from 'mongoose';

export interface IQuestion {
  questionText: string;
  options: string[];
  correctOptionIndex: number;
}

export interface IQuiz {
  _id?: Types.ObjectId;
  title: string;
  moduleId: Types.ObjectId;
  questions: IQuestion[];
  ecoPoints: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQuizSubmission {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  quizId: Types.ObjectId;
  score: number;
  maxScore: number;
  passed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
