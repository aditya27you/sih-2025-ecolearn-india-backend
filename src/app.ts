import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { rateLimit } from 'express-rate-limit';
import { globalErrorHandler } from './middlewares/error.middleware';
import routes from './routes';
import { env } from './config/env';

const app: Application = express();

// Security Headers
app.use(helmet());

// CORS Configuration
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

if (env.NODE_ENV === 'production') {
  app.use('/api', limiter);
}

// Body Parser
app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('<h1>EcoLearn India Backend API</h1>');
});

app.use('/api', routes);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
