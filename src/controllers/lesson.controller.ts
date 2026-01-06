import { Request, Response } from 'express';
import { lessonService } from '../services/lesson.service';
import { catchAsync } from '../utils/catchasync';
import { ApiResponse } from '../utils/apiresponse';

export const createLesson = catchAsync(async (req: Request, res: Response) => {
  const lesson = await lessonService.createLesson(req.body);
  res.status(201).json(lesson);
});

export const getLessonsByModule = catchAsync(
  async (req: Request, res: Response) => {
    const lessons = await lessonService.getLessonsByModule(req.params.moduleId);
    res.status(200).json(lessons);
  },
);

export const getLessonById = catchAsync(async (req: Request, res: Response) => {
  const lesson = await lessonService.getLessonById(req.params.id);
  res.status(200).json(lesson);
});

export const updateLesson = catchAsync(async (req: Request, res: Response) => {
  const lesson = await lessonService.updateLesson(req.params.id, req.body);
  res.status(200).json(lesson);
});

export const deleteLesson = catchAsync(async (req: Request, res: Response) => {
  await lessonService.deleteLesson(req.params.id);
  res.status(204).send();
});
