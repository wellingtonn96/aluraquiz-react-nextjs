import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/Quiz';
import { QuizRepository } from './quiz.repository';
import { ThemeQuizRepository } from '../theme/theme.repository';

export interface IQuiz {
  id: string;
  bg: string;
  title: string;
  description: string;
  questions: IQuestions[];
}

export interface IQuestions {
  image: string;
  title: string;
  answer: number;
  alternatives: string[];
}

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizRepository)
    private quisRepository: QuizRepository, // private themeRepository: ThemeQuizRepository,
  ) {}

  async createQuiz(data: CreateQuizDto): Promise<Quiz> {
    const quiz = this.quisRepository.create(data);

    return await this.quisRepository.save(quiz);
  }

  async getQuizes(): Promise<Quiz[]> {
    const quiz = await this.quisRepository.find({
      select: [
        'id',
        'img_bg_url',
        'description',
        'title',
        'theme',
        'updated_at',
        'created_at',
      ],
      relations: ['questions', 'theme'],
    });
    return quiz;
  }

  async getOneQuizById(id: string): Promise<Quiz> {
    this.quisRepository;
    const quiz = await this.quisRepository.findOne({
      select: [
        'id',
        'img_bg_url',
        'description',
        'title',
        'theme',
        'updated_at',
        'created_at',
      ],
      relations: ['questions', 'theme'],
      where: {
        id,
      },
    });
    return quiz;
  }

  async updateQuiz({
    id,
    themeId,
  }: {
    id: string;
    themeId: string;
  }): Promise<Quiz | undefined> {
    const quiz = await this.quisRepository.findOne(id);

    // const theme = await this.themeRepository.findOne(data.themeId);

    if (!quiz) {
      throw new Error('Quiz not found!');
    }

    quiz.themeId = themeId;

    await this.quisRepository.save(quiz);

    return quiz;
  }
}
