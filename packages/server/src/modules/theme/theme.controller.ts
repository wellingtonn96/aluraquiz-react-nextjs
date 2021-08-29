import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateThemeQuizDTO } from './dto/CreateThemeQuizDTO';
import { ThemeQuiz } from './entities/theme.repository';
import { IThemeUpdate, ThemeQuizService } from './theme.service';

@Controller('themeQuiz')
export class ThemeQuizController {
  constructor(private themeQuizService: ThemeQuizService) {}

  @Post()
  async createQuestion(
    @Body() CreateThemeQuizDTO: CreateThemeQuizDTO,
  ): Promise<ThemeQuiz> {
    return await this.themeQuizService.createThemeQuiz(CreateThemeQuizDTO);
  }

  @Get()
  async getAllThemeQuiz(): Promise<ThemeQuiz[]> {
    return await this.themeQuizService.getThemeQuiz();
  }

  @Get('/:id')
  async getOneThemeById(@Param('id') id: string) {
    return await this.themeQuizService.getOneThemeById(id);
  }

  @Put('/:id')
  async updateTheme(@Param('id') id: string, @Body() data: IThemeUpdate) {
    return await this.themeQuizService.updateThemeById({ id, theme: data });
  }
}
