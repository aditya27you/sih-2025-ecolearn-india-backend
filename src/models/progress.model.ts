import mongoose, { Schema } from 'mongoose';
import { IProgress } from '../types/progress.types';

const ProgressSchema = new Schema<IProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    moduleId: {
      type: String,
      required: true,
    },
    completedLessons: {
      type: [String],
      default: [],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    quizScore: {
      type: Number,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Compound index for user + module lookups
ProgressSchema.index({ userId: 1, moduleId: 1 }, { unique: true });

export const Progress = mongoose.model<IProgress>('Progress', ProgressSchema);
