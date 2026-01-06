import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { updateUserSchema } from '../validators/user.validator';

const router = Router();

// Protect all routes
router.use(protect);

router.get('/me', userController.getMe);
router.put('/me', validate(updateUserSchema), userController.updateMe);

export default router;