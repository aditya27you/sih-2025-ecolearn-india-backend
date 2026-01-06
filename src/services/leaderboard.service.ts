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

  async getUserRank(userId: string, filter?: string, schoolId?: string) {
    const user = await User.findById(userId);
    if (!user) return null;

    const query: any = { role: 'student' };
    if (filter === 'school' && schoolId) {
      query.schoolId = schoolId;
    }

    const rank = await User.countDocuments({
      ...query,
      ecoPoints: { $gt: user.ecoPoints },
    });

    return rank + 1;
  }

  async getLeaderboard(
    userId: string,
    filter: string = 'national',
    schoolId?: string,
    limit: number = 50,
  ) {
    const query: any = { role: 'student' };
    if (filter === 'school' && schoolId) {
      query.schoolId = schoolId;
    }

    const topUsers = await User.find(query)
      .sort({ ecoPoints: -1 })
      .limit(limit)
      .select('name ecoPoints schoolId grade avatar');

    const userRank = await this.getUserRank(userId, filter, schoolId);

    return {
      topUsers,
      userRank,
    };
  }
}

export const leaderboardService = new LeaderboardService();
