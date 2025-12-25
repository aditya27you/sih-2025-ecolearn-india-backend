import mongoose, { Schema } from 'mongoose';
import { IQuizSubmission } from '../types/quiz.types';

const QuizSubmissionSchema = new Schema<IQuizSubmission>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quizId: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    maxScore: {
      type: Number,
      required: true,
    },
    passed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const QuizSubmission = mongoose.model<IQuizSubmission>('QuizSubmission', QuizSubmissionSchema);
