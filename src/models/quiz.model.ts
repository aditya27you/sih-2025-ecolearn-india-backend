import mongoose, { Schema } from 'mongoose';
import { IQuiz } from '../types/quiz.types';

const QuestionSchema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: [(val: string[]) => val.length >= 2, 'At least 2 options required'],
  },
  correctOptionIndex: {
    type: Number,
    required: true,
  },
});

const QuizSchema = new Schema<IQuiz>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: 'Module',
      required: true,
      unique: true, // One quiz per module
    },
    questions: [QuestionSchema],
    ecoPoints: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema);
