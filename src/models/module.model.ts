import mongoose, { Schema } from 'mongoose';
import { IModule } from '../types/module.types';

const ModuleSchema = new Schema<IModule>(
  {
    title: {
      type: String,
      required: [true, 'Module title is required'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    ecoPoints: {
      type: Number,
      default: 0,
    },
    lessons: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
    quiz: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ModuleSchema.index({ title: 1 });

export const Module = mongoose.model<IModule>('Module', ModuleSchema);
