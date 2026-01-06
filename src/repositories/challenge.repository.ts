import { Challenge } from '../models/challenge.model';
import { IChallenge } from '../types/challenge.types';

export class ChallengeRepository {
  async create(data: Partial<IChallenge>): Promise<IChallenge> {
    return Challenge.create(data);
  }

  async findAllActive(): Promise<IChallenge[]> {
    return Challenge.find({ isActive: true }).sort({ deadline: 1 });
  }

  async findById(id: string): Promise<IChallenge | null> {
    return Challenge.findById(id);
  }

  async update(
    id: string,
    data: Partial<IChallenge>,
  ): Promise<IChallenge | null> {
    return Challenge.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string): Promise<IChallenge | null> {
    return Challenge.findByIdAndDelete(id);
  }
}

export const challengeRepository = new ChallengeRepository();
