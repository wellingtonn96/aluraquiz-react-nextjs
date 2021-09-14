import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from './question.controller';
import { QuestionsRepository } from './question.repository';
import { QuestionService } from './question.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionsRepository])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
