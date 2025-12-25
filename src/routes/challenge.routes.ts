import { Router } from 'express';
import * as challengeController from '../controllers/challenge.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { upload } from '../middlewares/upload.middleware';
import { 
  createChallengeSchema, 
  updateChallengeSchema, 
  processSubmissionSchema 
} from '../validators/challenge.validator';

const router = Router();

router
  .route('/')
  .get(challengeController.getAllActiveChallenges)
  .post(
    protect,
    restrictTo('admin'),
    validate(createChallengeSchema),
    challengeController.createChallenge
  );

router
  .route('/:id')
  .get(challengeController.getChallengeById)
  .patch(
    protect,
    restrictTo('admin'),
    validate(updateChallengeSchema),
    challengeController.updateChallenge
  )
  .delete(
    protect,
    restrictTo('admin'),
    challengeController.deleteChallenge
  );

router
  .route('/:id/submit')
  .post(
    protect,
    upload.single('challenge'), // 'challenge' is the field name
    challengeController.submitChallengeProof
  );

router
  .route('/:id/submissions')
  .get(
    protect,
    restrictTo('admin'),
    challengeController.getSubmissionsByChallenge
  );

router
  .route('/submissions/:id/approve')
  .patch(
    protect,
    restrictTo('admin'),
    validate(processSubmissionSchema),
    challengeController.approveSubmission
  );

router
  .route('/submissions/:id/reject')
  .patch(
    protect,
    restrictTo('admin'),
    validate(processSubmissionSchema),
    challengeController.rejectSubmission
  );

export default router;
