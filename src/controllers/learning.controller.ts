import { Request, Response } from 'express';
import { learningService } from '../services/learning.service';
import { catchAsync } from '../utils/catchasync';

export const markLessonComplete = catchAsync(
  async (req: Request, res: Response) => {
    const { moduleId, lessonId } = req.body;
    const progress = await learningService.updateLessonProgress(
      (req as any).user._id,
      moduleId,
      lessonId,
    );

    res.status(200).json(progress);
  },
);

export const submitQuizResult = catchAsync(
  async (req: Request, res: Response) => {
    const { moduleId, score } = req.body;
    const progress = await learningService.submitQuiz(
      (req as any).user._id,
      moduleId,
      score,
    );

    res.status(200).json(progress);
  },
);
