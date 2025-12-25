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
  challengeId: Types.ObjectId;
  userId: Types.ObjectId;
  proofImageUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
