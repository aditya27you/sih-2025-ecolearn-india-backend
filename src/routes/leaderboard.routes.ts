import { Router } from 'express';
import * as leaderboardController from '../controllers/leaderboard.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.get('/global', leaderboardController.getGlobalLeaderboard);
router.get('/school/:schoolId', leaderboardController.getSchoolLeaderboard);
router.get('/grade/:grade', leaderboardController.getGradeLeaderboard);
router.get('/me', protect, leaderboardController.getMyRank);
router.get('/', protect, leaderboardController.getLeaderboard);

export default router;