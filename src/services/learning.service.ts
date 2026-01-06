import { Progress } from '../models/progress.model';
import { userRepository } from '../repositories/user.repository';
import { ApiError } from '../utils/apierror';

export class LearningService {
  async updateLessonProgress(
    userId: string,
    moduleId: string,
    lessonId: string,
  ) {
    let progress = await Progress.findOne({ userId, moduleId });

    if (!progress) {
      progress = await Progress.create({
        userId,
        moduleId,
        completedLessons: [lessonId],
      });
      // Award eco-points for starting/completing a lesson
      await userRepository.update(userId, {
        $inc: { ecoPoints: 10 },
      } as any);
    } else {
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
        progress.lastAccessed = new Date();
        await progress.save();

        // Award eco-points
        await userRepository.update(userId, {
          $inc: { ecoPoints: 10 },
        } as any);
      }
    }

    return progress;
  }

  async submitQuiz(userId: string, moduleId: string, score: number) {
    let progress = await Progress.findOne({ userId, moduleId });

    if (!progress) {
      progress = await Progress.create({
        userId,
        moduleId,
        completedLessons: [],
        isCompleted: true,
        quizScore: score,
      });
    } else {
      progress.isCompleted = true;
      progress.quizScore = score;
      progress.lastAccessed = new Date();
      await progress.save();
    }

    // If score >= 70%, award bonus points (e.g., 50 pts)
    if (score >= 70) {
      await userRepository.update(userId, {
        $inc: { ecoPoints: 50 },
      } as any);
    }

    return progress;
  }
}

export const learningService = new LearningService();
