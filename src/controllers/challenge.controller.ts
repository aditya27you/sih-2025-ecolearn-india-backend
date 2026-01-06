import { Request, Response } from 'express';
import { challengeService } from '../services/challenge.service';
import { catchAsync } from '../utils/catchasync';
import { ApiResponse } from '../utils/apiresponse';
import { ApiError } from '../utils/apierror';

export const createChallenge = catchAsync(
  async (req: Request, res: Response) => {
    const challenge = await challengeService.createChallenge({
      ...req.body,
      createdBy: (req as any).user._id,
    });
    res.status(201).json(challenge);
  },
);

export const getAllActiveChallenges = catchAsync(
  async (req: Request, res: Response) => {
    const challenges = await challengeService.getAllActiveChallenges();
    res.status(200).json(challenges);
  },
);

export const getChallengeById = catchAsync(
  async (req: Request, res: Response) => {
    const challenge = await challengeService.getChallengeById(req.params.id);
    res.status(200).json(challenge);
  },
);

export const updateChallenge = catchAsync(
  async (req: Request, res: Response) => {
    const challenge = await challengeService.updateChallenge(
      req.params.id,
      req.body,
    );
    res.status(200).json(challenge);
  },
);

export const deleteChallenge = catchAsync(
  async (req: Request, res: Response) => {
    await challengeService.deleteChallenge(req.params.id);
    res.status(204).send();
  },
);

// Submission Controllers
export const submitChallengeProof = catchAsync(
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new ApiError('Please upload proof image', 400);
    }

    const { challengeId, challengeTitle, description, points } = req.body;

    const submission = await challengeService.submitChallengeProof(
      (req as any).user._id,
      {
        challengeId,
        challengeTitle,
        description,
        points: Number(points),
        imageUrl: req.file.path,
      },
    );

    res.status(201).json(submission);
  },
);

export const getUserSubmissions = catchAsync(
  async (req: Request, res: Response) => {
    const submissions = await challengeService.getUserSubmissions(
      (req as any).user._id,
    );
    res.status(200).json(submissions);
  },
);

export const getSubmissionsByChallenge = catchAsync(
  async (req: Request, res: Response) => {
    const submissions = await challengeService.getSubmissionsByChallenge(
      req.params.id,
    );
    res.status(200).json(submissions);
  },
);

export const approveSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const { feedback } = req.body;
    const submission = await challengeService.approveSubmission(
      req.params.id,
      feedback,
    );
    res.status(200).json(submission);
  },
);

export const rejectSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const { feedback } = req.body;
    if (!feedback) {
      throw new ApiError('Feedback is required for rejection', 400);
    }
    const submission = await challengeService.rejectSubmission(
      req.params.id,
      feedback,
    );
    res.status(200).json(submission);
  },
);
