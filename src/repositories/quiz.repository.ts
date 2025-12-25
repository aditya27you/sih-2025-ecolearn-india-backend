import { Quiz } from '../models/quiz.model';
import { IQuiz } from '../types/quiz.types';

export class QuizRepository {
  async create(data: Partial<IQuiz>): Promise<IQuiz> {
    return Quiz.create(data);
  }

  async findByModule(moduleId: string): Promise<IQuiz | null> {
    return Quiz.findOne({ moduleId });
  }

  async findById(id: string): Promise<IQuiz | null> {
    return Quiz.findById(id);
  }

  async update(id: string, data: Partial<IQuiz>): Promise<IQuiz | null> {
    return Quiz.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<IQuiz | null> {
    return Quiz.findByIdAndDelete(id);
  }
}

export const quizRepository = new QuizRepository();
