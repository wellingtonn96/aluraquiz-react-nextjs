import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/Quiz';
import { QuizRepository } from './quiz.repository';

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

export interface IQuizUpdate {
  bg: string;
  title: string;
  description: string;
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
    const findQuiz = await this.quisRepository.findOne(id);

    if (!findQuiz) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Quiz with this id not exits!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

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

  async addThemeToQuiz({
    id,
    themeId,
  }: {
    id: string;
    themeId: string;
  }): Promise<Quiz | undefined> {
    const quiz = await this.quisRepository.findOne(id);

    if (!quiz) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Quiz with this id not exits!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    quiz.themeId = themeId;

    await this.quisRepository.save(quiz);

    return quiz;
  }

  async updateQuizById({
    id,
    quiz,
  }: {
    id: string;
    quiz: IQuizUpdate;
  }): Promise<IQuizUpdate> {
    const findQuiz = await this.getOneQuizById(id);

    if (!findQuiz) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Quiz with this id not exits!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const assignQuiz = Object.assign(findQuiz, quiz);

    const quizUpdated = this.quisRepository.save(assignQuiz);

    return quizUpdated;
  }

  async removeQuizById(id: string): Promise<Quiz> {
    const findQuiz = await this.getOneQuizById(id);

    if (!findQuiz) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Quiz with this id not exits!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const removedQuiz = await this.quisRepository.remove(findQuiz);

    return removedQuiz;
  }
}
