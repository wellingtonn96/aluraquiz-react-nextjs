import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateThemeQuizDTO } from './dto/CreateThemeQuizDTO';
import { ThemeQuiz } from './entities/theme.repository';
import { ThemeQuizService } from './theme.service';

@Controller('themeQuiz')
export class ThemeQuizController {
  constructor(private ThemeQuizService: ThemeQuizService) {}

  @Post()
  async createQuestion(
    @Body() CreateThemeQuizDTO: CreateThemeQuizDTO,
  ): Promise<ThemeQuiz> {
    return await this.ThemeQuizService.createThemeQuiz(CreateThemeQuizDTO);
  }

  @Get()
  async getAllThemeQuiz(): Promise<ThemeQuiz[]> {
    return await this.ThemeQuizService.getThemeQuiz();
  }
}
