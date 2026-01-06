import { quizRepository } from '../repositories/quiz.repository';
import { QuizSubmission } from '../models/quizSubmission.model';
import { userRepository } from '../repositories/user.repository';
import { moduleRepository } from '../repositories/module.repository';
import { ApiError } from '../utils/apierror';
import { IQuiz } from '../types/quiz.types';

export class QuizService {
  async createQuiz(data: Partial<IQuiz>) {
    if (!data.moduleId) {
      throw new ApiError('Module ID is required', 400);
    }
    const quiz = await quizRepository.create(data);

    // Link quiz to module
    await moduleRepository.update(data.moduleId.toString(), {
      quiz: quiz._id,
    } as any);

    return quiz;
  }

  async getQuizByModule(moduleId: string) {
    const quiz = await quizRepository.findByModule(moduleId);
    if (!quiz) {
      throw new ApiError('Quiz not found for this module', 404);
    }
    return quiz;
  }

  async submitQuiz(userId: string, quizId: string, answers: number[]) {
    const quiz = await quizRepository.findById(quizId);
    if (!quiz) {
      throw new ApiError('Quiz not found', 404);
    }

    if (answers.length !== quiz.questions.length) {
      throw new ApiError('Invalid number of answers', 400);
    }

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctOptionIndex === answers[index]) {
        score++;
      }
    });

    const maxScore = quiz.questions.length;
    const passed = score / maxScore >= 0.6; // 60% to pass

    const submission = await QuizSubmission.create({
      userId,
      quizId,
      score,
      maxScore,
      passed,
    });

    if (passed) {
      // Award eco-points if it's the first time passing
      const previousPass = await QuizSubmission.findOne({
        userId,
        quizId,
        passed: true,
        _id: { $ne: submission._id },
      });

      if (!previousPass) {
        await userRepository.update(userId, {
          $inc: { ecoPoints: quiz.ecoPoints },
        } as any);
      }
    }

    return submission;
  }

  async getQuizById(id: string) {
    const quiz = await quizRepository.findById(id);
    if (!quiz) {
      throw new ApiError('Quiz not found', 404);
    }
    return quiz;
  }

  async updateQuiz(id: string, data: Partial<IQuiz>) {
    const updated = await quizRepository.update(id, data);
    if (!updated) {
      throw new ApiError('Quiz not found', 404);
    }
    return updated;
  }

  async deleteQuiz(id: string) {
    const quiz = await quizRepository.findById(id);
    if (!quiz) {
      throw new ApiError('Quiz not found', 404);
    }

    const deleted = await quizRepository.delete(id);

    // Remove quiz from module
    if (quiz.moduleId) {
      await moduleRepository.update(quiz.moduleId.toString(), {
        $unset: { quiz: 1 },
      } as any);
    }

    return deleted;
  }
}

export const quizService = new QuizService();
