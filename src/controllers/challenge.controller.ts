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
    res
      .status(201)
      .json(new ApiResponse(201, challenge, 'Challenge created successfully'));
  },
);

export const getAllActiveChallenges = catchAsync(
  async (req: Request, res: Response) => {
    const challenges = await challengeService.getAllActiveChallenges();
    res
      .status(200)
      .json(
        new ApiResponse(200, challenges, 'Challenges fetched successfully'),
      );
  },
);

export const getChallengeById = catchAsync(
  async (req: Request, res: Response) => {
    const challenge = await challengeService.getChallengeById(req.params.id);
    res
      .status(200)
      .json(new ApiResponse(200, challenge, 'Challenge fetched successfully'));
  },
);

export const updateChallenge = catchAsync(
  async (req: Request, res: Response) => {
    const challenge = await challengeService.updateChallenge(
      req.params.id,
      req.body,
    );
    res
      .status(200)
      .json(new ApiResponse(200, challenge, 'Challenge updated successfully'));
  },
);

export const deleteChallenge = catchAsync(
  async (req: Request, res: Response) => {
    await challengeService.deleteChallenge(req.params.id);
    res
      .status(200)
      .json(new ApiResponse(200, null, 'Challenge deleted successfully'));
  },
);

// Submission Controllers
export const submitChallengeProof = catchAsync(
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new ApiError('Please upload proof image', 400);
    }

    const submission = await challengeService.submitChallengeProof(
      (req as any).user._id,
      req.params.id,
      req.file.path,
    );

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          submission,
          'Challenge proof submitted successfully',
        ),
      );
  },
);

export const getUserSubmissions = catchAsync(
  async (req: Request, res: Response) => {
    const submissions = await challengeService.getUserSubmissions(
      (req as any).user._id,
    );
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          submissions,
          'User submissions fetched successfully',
        ),
      );
  },
);

export const getSubmissionsByChallenge = catchAsync(
  async (req: Request, res: Response) => {
    const submissions = await challengeService.getSubmissionsByChallenge(
      req.params.id,
    );
    res
      .status(200)
      .json(
        new ApiResponse(200, submissions, 'Submissions fetched successfully'),
      );
  },
);

export const approveSubmission = catchAsync(
  async (req: Request, res: Response) => {
    const { feedback } = req.body;
    const submission = await challengeService.approveSubmission(
      req.params.id,
      feedback,
    );
    res
      .status(200)
      .json(
        new ApiResponse(200, submission, 'Submission approved successfully'),
      );
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
    res
      .status(200)
      .json(
        new ApiResponse(200, submission, 'Submission rejected successfully'),
      );
  },
);
