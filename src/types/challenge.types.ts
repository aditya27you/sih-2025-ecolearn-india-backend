import { Types } from 'mongoose';

export interface IChallenge {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  ecoPoints: number;
  deadline: Date;
  imageUrl?: string;
  createdBy: Types.ObjectId;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISubmission {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  challengeId: string;
  challengeTitle: string;
  description: string;
  imageUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  points: number;
  submittedAt: Date;
  teacherComment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
