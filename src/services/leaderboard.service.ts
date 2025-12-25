import { User } from '../models/user.model';

export class LeaderboardService {
  async getGlobalLeaderboard(limit: number = 10) {
    return User.find({ role: 'student' })
      .sort({ ecoPoints: -1 })
      .limit(limit)
      .select('name ecoPoints schoolId grade');
  }

  async getSchoolLeaderboard(schoolId: string, limit: number = 10) {
    return User.find({ role: 'student', schoolId })
      .sort({ ecoPoints: -1 })
      .limit(limit)
      .select('name ecoPoints grade');
  }

  async getGradeLeaderboard(grade: number, limit: number = 10) {
    return User.find({ role: 'student', grade })
      .sort({ ecoPoints: -1 })
      .limit(limit)
      .select('name ecoPoints schoolId');
  }

  async getUserRank(userId: string) {
    const user = await User.findById(userId);
    if (!user) return null;

    const rank = await User.countDocuments({
      role: 'student',
      ecoPoints: { $gt: user.ecoPoints },
    });

    return rank + 1;
  }
}

export const leaderboardService = new LeaderboardService();
