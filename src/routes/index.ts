import { Router, Request, Response } from 'express';

const router = Router();

// Health Check
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    success: true, 
    message: 'EcoLearn India API is running', 
    timestamp: new Date().toISOString() 
  });
});

export default router;
