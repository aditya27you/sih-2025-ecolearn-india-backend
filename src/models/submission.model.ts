import mongoose, { Schema } from 'mongoose';
import { ISubmission } from '../types/challenge.types';

const SubmissionSchema = new Schema<ISubmission>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    challengeId: {
      type: String,
      required: true,
    },
    challengeTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    points: {
      type: Number,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    teacherComment: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Submission = mongoose.model<ISubmission>(
  'Submission',
  SubmissionSchema,
);
