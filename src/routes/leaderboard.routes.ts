import { Router } from 'express';
import * as leaderboardController from '../controllers/leaderboard.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Leaderboard
 *   description: Gamification rankings
 */

/**
 * @swagger
 * /leaderboard/global:
 *   get:
 *     summary: Get global leaderboard
 *     tags: [Leaderboard]
 *     responses:
 *       200:
 *         description: Global rankings
 */
router.get('/global', leaderboardController.getGlobalLeaderboard);

/**
 * @swagger
 * /leaderboard/school/{schoolId}:
 *   get:
 *     summary: Get school leaderboard
 *     tags: [Leaderboard]
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: School rankings
 */
router.get('/school/:schoolId', leaderboardController.getSchoolLeaderboard);

/**
 * @swagger
 * /leaderboard/grade/{grade}:
 *   get:
 *     summary: Get grade leaderboard
 *     tags: [Leaderboard]
 *     parameters:
 *       - in: path
 *         name: grade
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grade rankings
 */
router.get('/grade/:grade', leaderboardController.getGradeLeaderboard);

/**
 * @swagger
 * /leaderboard/me:
 *   get:
 *     summary: Get my current rank
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user's rank and points
 *       401:
 *         description: Unauthorized
 */
router.get('/me', protect, leaderboardController.getMyRank);

router.get('/', protect, leaderboardController.getLeaderboard);

export default router;
