import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import moduleRoutes from './module.routes';
import quizRoutes from './quiz.routes';
import challengeRoutes from './challenge.routes';

const router = Router();

// Health Check
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    success: true, 
    message: 'EcoLearn India API is running', 
    timestamp: new Date().toISOString() 
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/modules', moduleRoutes);
router.use('/quizzes', quizRoutes);
router.use('/challenges', challengeRoutes);

export default router;