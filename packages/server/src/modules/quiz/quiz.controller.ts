import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { Quiz } from './entities/Quiz';
import { QuizService } from './quiz.service';

@Controller('/quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post('/')
  async createQuiz(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
    return await this.quizService.createQuiz(createQuizDto);
  }

  @Get()
  async getAllQuizes(): Promise<Quiz[]> {
    return await this.quizService.getQuizes();
  }

  @Get('/:id')
  async getOneQuiz(@Param('id') id: string): Promise<Quiz> {
    return await this.quizService.getOneQuizById(id);
  }

  @Patch('/:id')
  async updateQuizThemeId(
    @Param('id') id: string,
    @Body() data: string,
  ): Promise<Quiz> {
    const { themeId } = data as any;
    return await this.quizService.updateQuiz({ id, themeId: themeId });
  }
}
