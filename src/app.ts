import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { globalErrorHandler } from './middlewares/error.middleware';

const app: Application = express();

// Global Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    success: true, 
    message: 'EcoLearn India API is running', 
    timestamp: new Date().toISOString() 
  });
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
