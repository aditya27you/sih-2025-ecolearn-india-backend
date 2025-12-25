import { lessonRepository } from '../repositories/lesson.repository';
import { moduleRepository } from '../repositories/module.repository';
import { ILesson } from '../types/module.types';
import { ApiError } from '../utils/apierror';

export class LessonService {
  async createLesson(data: Partial<ILesson>) {
    if (!data.moduleId) {
      throw new ApiError('Module ID is required', 400);
    }
    
    const lesson = await lessonRepository.create(data);
    
    // Add lesson to module's lessons array
    await moduleRepository.update(data.moduleId.toString(), {
      $push: { lessons: lesson._id } as any
    });

    return lesson;
  }

  async getLessonsByModule(moduleId: string) {
    return lessonRepository.findByModule(moduleId);
  }

  async getLessonById(id: string) {
    const lesson = await lessonRepository.findById(id);
    if (!lesson) {
      throw new ApiError('Lesson not found', 404);
    }
    return lesson;
  }

  async updateLesson(id: string, data: Partial<ILesson>) {
    const updated = await lessonRepository.update(id, data);
    if (!updated) {
      throw new ApiError('Lesson not found', 404);
    }
    return updated;
  }

  async deleteLesson(id: string) {
    const lesson = await lessonRepository.findById(id);
    if (!lesson) {
      throw new ApiError('Lesson not found', 404);
    }

    const deleted = await lessonRepository.delete(id);
    
    // Remove lesson from module's lessons array
    if (lesson.moduleId) {
      await moduleRepository.update(lesson.moduleId.toString(), {
        $pull: { lessons: id } as any
      });
    }

    return deleted;
  }
}

export const lessonService = new LessonService();
