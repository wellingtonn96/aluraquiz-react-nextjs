import { Module } from '@nestjs/common';
import { QuizModule } from './modules/quiz/quiz.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './modules/questions/question.module';
import { ThemeQuizModule } from './modules/theme/theme.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    QuizModule,
    QuestionModule,
    ThemeQuizModule,
  ],
})
export class AppModule {}
