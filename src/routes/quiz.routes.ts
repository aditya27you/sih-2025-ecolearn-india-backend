import { Router } from 'express';
import * as quizController from '../controllers/quiz.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  createQuizSchema,
  submitQuizSchema,
  updateQuizSchema,
} from '../validators/quiz.validator';

const router = Router();

router
  .route('/')
  .post(
    protect,
    restrictTo('admin', 'teacher'),
    validate(createQuizSchema),
    quizController.createQuiz,
  );

router.route('/module/:moduleId').get(quizController.getQuizByModule);

router
  .route('/:id')
  .get(quizController.getQuizById)
  .patch(
    protect,
    restrictTo('admin', 'teacher'),
    validate(updateQuizSchema),
    quizController.updateQuiz,
  )
  .delete(protect, restrictTo('admin', 'teacher'), quizController.deleteQuiz);

router
  .route('/:id/submit')
  .post(protect, validate(submitQuizSchema), quizController.submitQuiz);

export default router;
