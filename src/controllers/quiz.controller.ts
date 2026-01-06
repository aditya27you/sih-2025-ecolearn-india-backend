import { Request, Response } from 'express';
import { quizService } from '../services/quiz.service';
import { catchAsync } from '../utils/catchasync';
import { ApiResponse } from '../utils/apiresponse';

export const createQuiz = catchAsync(async (req: Request, res: Response) => {
  const quiz = await quizService.createQuiz(req.body);
  res.status(201).json(quiz);
});

export const getQuizByModule = catchAsync(
  async (req: Request, res: Response) => {
    const quiz = await quizService.getQuizByModule(req.params.moduleId);
    res.status(200).json(quiz);
  },
);

export const getQuizById = catchAsync(async (req: Request, res: Response) => {
  const quiz = await quizService.getQuizById(req.params.id);
  res.status(200).json(quiz);
});

export const submitQuiz = catchAsync(async (req: Request, res: Response) => {
  const { answers } = req.body;
  const result = await quizService.submitQuiz(
    (req as any).user._id,
    req.params.moduleId,
    answers,
  );
  res.status(200).json(result);
});

export const updateQuiz = catchAsync(async (req: Request, res: Response) => {
  const quiz = await quizService.updateQuiz(req.params.id, req.body);
  res.status(200).json(quiz);
});

export const deleteQuiz = catchAsync(async (req: Request, res: Response) => {
  await quizService.deleteQuiz(req.params.id);
  res.status(204).send();
});
