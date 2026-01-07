import { Router } from 'express';
import * as moduleController from '../controllers/module.controller';
import * as lessonController from '../controllers/lesson.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  createModuleSchema,
  updateModuleSchema,
} from '../validators/module.validator';
import {
  createLessonSchema,
  updateLessonSchema,
} from '../validators/lesson.validator';

const router = Router();

router
  .route('/')
  .get(moduleController.getAllModules)
  .post(
    protect,
    restrictTo('admin', 'teacher'),
    validate(createModuleSchema),
    moduleController.createModule,
  );

router
  .route('/:id')
  .get(moduleController.getModuleById)
  .patch(
    protect,
    restrictTo('admin', 'teacher'),
    validate(updateModuleSchema),
    moduleController.updateModule,
  )
  .delete(
    protect,
    restrictTo('admin', 'teacher'),
    moduleController.deleteModule,
  );

// Nested Lesson Routes for a specific Module
router
  .route('/:moduleId/lessons')
  .get(lessonController.getLessonsByModule)
  .post(
    protect,
    restrictTo('admin', 'teacher'),
    validate(createLessonSchema),
    lessonController.createLesson,
  );

// Individual Lesson Routes
router
  .route('/lessons/:id')
  .get(lessonController.getLessonById)
  .patch(
    protect,
    restrictTo('admin', 'teacher'),
    validate(updateLessonSchema),
    lessonController.updateLesson,
  )
  .delete(
    protect,
    restrictTo('admin', 'teacher'),
    lessonController.deleteLesson,
  );

export default router;
