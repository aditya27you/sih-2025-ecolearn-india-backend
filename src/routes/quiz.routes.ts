import { Router } from 'express';
import * as quizController from '../controllers/quiz.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createQuizSchema, submitQuizSchema, updateQuizSchema } from '../validators/quiz.validator';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Quiz management and taking
 */

/**
 * @swagger
 * /quizzes:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, module, questions]
 *             properties:
 *               title: { type: string }
 *               module: { type: string, description: "Module ID" }
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionText: { type: string }
 *                     options: { type: array, items: { type: string } }
 *                     correctAnswer: { type: number }
 *                     points: { type: number }
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router
  .route('/')
  .post(
    protect,
    restrictTo('admin', 'teacher'),
    validate(createQuizSchema),
    quizController.createQuiz
  );

/**
 * @swagger
 * /quizzes/module/{moduleId}:
 *   get:
 *     summary: Get quiz for a specific module
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz details
 *       404:
 *         description: Quiz not found
 */
router
  .route('/module/:moduleId')
  .get(quizController.getQuizByModule);

/**
 * @swagger
 * /quizzes/{id}:
 *   get:
 *     summary: Get quiz by ID
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz details
 *       404:
 *         description: Quiz not found
 *   patch:
 *     summary: Update a quiz
 *     tags: [Quizzes]
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
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Quiz not found
 *   delete:
 *     summary: Delete a quiz
 *     tags: [Quizzes]
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
 *         description: Quiz deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Quiz not found
 */
router
  .route('/:id')
  .get(quizController.getQuizById)
  .patch(
    protect,
    restrictTo('admin', 'teacher'),
    validate(updateQuizSchema),
    quizController.updateQuiz
  )
  .delete(
    protect,
    restrictTo('admin', 'teacher'),
    quizController.deleteQuiz
  );

/**
 * @swagger
 * /quizzes/{id}/submit:
 *   post:
 *     summary: Submit quiz answers
 *     tags: [Quizzes]
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
 *             required: [answers]
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [questionId, selectedOption]
 *                   properties:
 *                     questionId: { type: string }
 *                     selectedOption: { type: number }
 *     responses:
 *       200:
 *         description: Quiz submitted successfully (returns score)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Quiz not found
 */
router
  .route('/:id/submit')
  .post(
    protect,
    validate(submitQuizSchema),
    quizController.submitQuiz
  );

export default router;