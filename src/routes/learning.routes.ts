import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import * as learningController from '../controllers/learning.controller';

const router = Router();

router.use(protect);

router.post('/progress', learningController.markLessonComplete);
router.post('/quiz', learningController.submitQuizResult);

export default router;
