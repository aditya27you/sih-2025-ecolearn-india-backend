import { Lesson } from '../models/lesson.model';
import { ILesson } from '../types/module.types';

export class LessonRepository {
  async create(data: Partial<ILesson>): Promise<ILesson> {
    return Lesson.create(data);
  }

  async findByModule(moduleId: string): Promise<ILesson[]> {
    return Lesson.find({ moduleId }).sort({ order: 1 });
  }

  async findById(id: string): Promise<ILesson | null> {
    return Lesson.findById(id);
  }

  async update(id: string, data: Partial<ILesson>): Promise<ILesson | null> {
    return Lesson.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string): Promise<ILesson | null> {
    return Lesson.findByIdAndDelete(id);
  }
}

export const lessonRepository = new LessonRepository();
