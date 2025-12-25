import mongoose, { Schema } from 'mongoose';
import { IChallenge } from '../types/challenge.types';

const ChallengeSchema = new Schema<IChallenge>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    ecoPoints: {
      type: Number,
      required: true,
      default: 0,
    },
    deadline: {
      type: Date,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Challenge = mongoose.model<IChallenge>('Challenge', ChallengeSchema);
