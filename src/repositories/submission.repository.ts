import { Submission } from '../models/submission.model';
import { ISubmission } from '../types/challenge.types';

export class SubmissionRepository {
  async create(data: Partial<ISubmission>): Promise<ISubmission> {
    return Submission.create(data);
  }

  async findByChallenge(challengeId: string): Promise<ISubmission[]> {
    return Submission.find({ challengeId }).populate('userId', 'name email');
  }

  async findByUser(userId: string): Promise<ISubmission[]> {
    return Submission.find({ userId }).populate(
      'challengeId',
      'title ecoPoints',
    );
  }

  async findById(id: string): Promise<ISubmission | null> {
    return Submission.findById(id).populate('challengeId userId');
  }

  async update(
    id: string,
    data: Partial<ISubmission>,
  ): Promise<ISubmission | null> {
    return Submission.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
}

export const submissionRepository = new SubmissionRepository();
