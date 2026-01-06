import { challengeRepository } from '../repositories/challenge.repository';
import { submissionRepository } from '../repositories/submission.repository';
import { userRepository } from '../repositories/user.repository';
import { IChallenge, ISubmission } from '../types/challenge.types';
import { ApiError } from '../utils/apierror';

export class ChallengeService {
  // Challenge Methods
  async createChallenge(data: Partial<IChallenge>) {
    return challengeRepository.create(data);
  }

  async getAllActiveChallenges() {
    return challengeRepository.findAllActive();
  }

  async getChallengeById(id: string) {
    const challenge = await challengeRepository.findById(id);
    if (!challenge) {
      throw new ApiError('Challenge not found', 404);
    }
    return challenge;
  }

  async updateChallenge(id: string, data: Partial<IChallenge>) {
    const updated = await challengeRepository.update(id, data);
    if (!updated) {
      throw new ApiError('Challenge not found', 404);
    }
    return updated;
  }

  async deleteChallenge(id: string) {
    const deleted = await challengeRepository.delete(id);
    if (!deleted) {
      throw new ApiError('Challenge not found', 404);
    }
    return deleted;
  }

  // Submission Methods
  async submitChallengeProof(
    userId: string,
    challengeId: string,
    proofImageUrl: string,
  ) {
    const challenge = await challengeRepository.findById(challengeId);
    if (!challenge) {
      throw new ApiError('Challenge not found', 404);
    }

    if (new Date() > challenge.deadline) {
      throw new ApiError('Challenge deadline has passed', 400);
    }

    return submissionRepository.create({
      userId: userId as any,
      challengeId: challengeId as any,
      proofImageUrl,
      status: 'pending',
    });
  }

  async getSubmissionsByChallenge(challengeId: string) {
    return submissionRepository.findByChallenge(challengeId);
  }

  async getUserSubmissions(userId: string) {
    return submissionRepository.findByUser(userId);
  }

  async approveSubmission(submissionId: string, feedback?: string) {
    const submission = await submissionRepository.findById(submissionId);
    if (!submission) {
      throw new ApiError('Submission not found', 404);
    }

    if (submission.status !== 'pending') {
      throw new ApiError('Submission already processed', 400);
    }

    const updatedSubmission = await submissionRepository.update(submissionId, {
      status: 'approved',
      feedback,
    });

    // Award eco-points
    const challenge = submission.challengeId as any;
    await userRepository.update(submission.userId.toString(), {
      $inc: { ecoPoints: challenge.ecoPoints },
    } as any);

    return updatedSubmission;
  }

  async rejectSubmission(submissionId: string, feedback: string) {
    const updatedSubmission = await submissionRepository.update(submissionId, {
      status: 'rejected',
      feedback,
    });

    if (!updatedSubmission) {
      throw new ApiError('Submission not found', 404);
    }

    return updatedSubmission;
  }
}

export const challengeService = new ChallengeService();
