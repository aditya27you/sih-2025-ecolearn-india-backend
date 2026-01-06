import mongoose, { Schema } from 'mongoose';
import { ILesson } from '../types/module.types';

const LessonSchema = new Schema<ILesson>(
  {
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    videoUrl: {
      type: String,
    },
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: 'Module',
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index for performance and ordering
LessonSchema.index({ moduleId: 1, order: 1 });

export const Lesson = mongoose.model<ILesson>('Lesson', LessonSchema);
