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

/**
 * @swagger
 * tags:
 *   name: Modules
 *   description: Educational modules management
 */

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Lesson management within modules
 */

/**
 * @swagger
 * /modules:
 *   get:
 *     summary: Get all modules
 *     tags: [Modules]
 *     responses:
 *       200:
 *         description: List of all modules
 *   post:
 *     summary: Create a new module
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, gradeLevel]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               gradeLevel: { type: number }
 *     responses:
 *       201:
 *         description: Module created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router
  .route('/')
  .get(moduleController.getAllModules)
  .post(
    protect,
    restrictTo('admin', 'teacher'),
    validate(createModuleSchema),
    moduleController.createModule,
  );

/**
 * @swagger
 * /modules/{id}:
 *   get:
 *     summary: Get module by ID
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Module details
 *       404:
 *         description: Module not found
 *   patch:
 *     summary: Update a module
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               gradeLevel: { type: number }
 *     responses:
 *       200:
 *         description: Module updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Module not found
 *   delete:
 *     summary: Delete a module
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Module deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Module not found
 */
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
/**
 * @swagger
 * /modules/{moduleId}/lessons:
 *   get:
 *     summary: Get all lessons for a specific module
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of lessons
 *       404:
 *         description: Module not found
 *   post:
 *     summary: Create a new lesson for a module
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content, order]
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *               order: { type: number }
 *               videoUrl: { type: string }
 *     responses:
 *       201:
 *         description: Lesson created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
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
/**
 * @swagger
 * /modules/lessons/{id}:
 *   get:
 *     summary: Get lesson by ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson details
 *       404:
 *         description: Lesson not found
 *   patch:
 *     summary: Update a lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *               order: { type: number }
 *               videoUrl: { type: string }
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Lesson not found
 *   delete:
 *     summary: Delete a lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Lesson deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Lesson not found
 */
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
