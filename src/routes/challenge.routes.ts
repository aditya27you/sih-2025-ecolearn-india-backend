import { Router } from 'express';
import * as challengeController from '../controllers/challenge.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { upload } from '../middlewares/upload.middleware';
import {
  createChallengeSchema,
  updateChallengeSchema,
  processSubmissionSchema,
} from '../validators/challenge.validator';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Challenges
 *   description: Eco-challenges and submission management
 */

/**
 * @swagger
 * /challenges:
 *   get:
 *     summary: Get all active challenges
 *     tags: [Challenges]
 *     responses:
 *       200:
 *         description: List of active challenges
 *   post:
 *     summary: Create a new challenge
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, points, startDate, endDate]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               points: { type: number }
 *               startDate: { type: string, format: date-time }
 *               endDate: { type: string, format: date-time }
 *     responses:
 *       201:
 *         description: Challenge created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router
  .route('/')
  .get(challengeController.getAllActiveChallenges)
  .post(
    protect,
    restrictTo('admin'),
    validate(createChallengeSchema),
    challengeController.createChallenge,
  );

/**
 * @swagger
 * /challenges/{id}:
 *   get:
 *     summary: Get challenge by ID
 *     tags: [Challenges]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Challenge details
 *       404:
 *         description: Challenge not found
 *   patch:
 *     summary: Update a challenge
 *     tags: [Challenges]
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
 *               points: { type: number }
 *     responses:
 *       200:
 *         description: Challenge updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Challenge not found
 *   delete:
 *     summary: Delete a challenge
 *     tags: [Challenges]
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
 *         description: Challenge deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Challenge not found
 */
router
  .route('/:id')
  .get(challengeController.getChallengeById)
  .patch(
    protect,
    restrictTo('admin'),
    validate(updateChallengeSchema),
    challengeController.updateChallenge,
  )
  .delete(protect, restrictTo('admin'), challengeController.deleteChallenge);

router.route('/submit').post(
  protect,
  upload.single('file'),
  challengeController.submitChallengeProof,
);

router
  .route('/my-submissions')
  .get(protect, challengeController.getUserSubmissions);

/**
 * @swagger
 * /challenges/{id}/submissions:
 *   get:
 *     summary: Get all submissions for a challenge (Admin only)
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of submissions
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router
  .route('/:id/submissions')
  .get(
    protect,
    restrictTo('admin'),
    challengeController.getSubmissionsByChallenge,
  );

/**
 * @swagger
 * /challenges/submissions/{id}/approve:
 *   patch:
 *     summary: Approve a submission
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Submission approved and points awarded
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Submission not found
 */
router
  .route('/submissions/:id/approve')
  .patch(
    protect,
    restrictTo('admin'),
    validate(processSubmissionSchema),
    challengeController.approveSubmission,
  );

/**
 * @swagger
 * /challenges/submissions/{id}/reject:
 *   patch:
 *     summary: Reject a submission
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Submission rejected
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Submission not found
 */
router
  .route('/submissions/:id/reject')
  .patch(
    protect,
    restrictTo('admin'),
    validate(processSubmissionSchema),
    challengeController.rejectSubmission,
  );

export default router;
