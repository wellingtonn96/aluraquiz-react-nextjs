import { Injectable } from '@nestjs/common';
import { CreateThemeQuizDTO } from './dto/CreateThemeQuizDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeQuiz } from './entities/theme.repository';
import { ThemeQuizRepository } from './theme.repository';

@Injectable()
export class ThemeQuizService {
  constructor(
    @InjectRepository(ThemeQuizRepository)
    private quisRepository: ThemeQuizRepository,
  ) {}

  async createThemeQuiz(data: CreateThemeQuizDTO): Promise<ThemeQuiz> {
    const thmeQuiz = this.quisRepository.create(data);

    return await this.quisRepository.save(thmeQuiz);
  }

  async getThemeQuiz(): Promise<ThemeQuiz[]> {
    const thmeQuiz = await this.quisRepository.find();

    return thmeQuiz;
  }
}
