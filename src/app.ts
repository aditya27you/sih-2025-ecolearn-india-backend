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
const allowedOrigins = [
  env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
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
