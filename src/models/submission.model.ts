import mongoose, { Schema } from 'mongoose';
import { ISubmission } from '../types/challenge.types';

const SubmissionSchema = new Schema<ISubmission>(
  {
    challengeId: {
      type: Schema.Types.ObjectId,
      ref: 'Challenge',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    proofImageUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    feedback: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);
