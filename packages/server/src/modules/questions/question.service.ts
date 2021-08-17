import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from './entities/question.repository';
import { QuestionsRepository } from './question.repository'
import { Any } from 'typeorm';

@Injectable()
export class QuestionService {
	constructor(
		@InjectRepository(QuestionsRepository)
		private quisRepository: QuestionsRepository,
	) { }

	async createQuestion(data: CreateQuestionDto): Promise<Questions> {
		const quiz = this.quisRepository.create(data)

		return await this.quisRepository.save(quiz)
	}

	async getQuestions(): Promise<Questions[]> {

		const quiz = await this.quisRepository.find({
			select: ['description', 'id', 'image_url', 'title', 'created_at', 'updated_at'],
			relations: ['quiz'],
		});

		return quiz
		// return await this.quisRepository.query(`
		// SELECT * FROM "questions" INNER JOIN "quiz" 
		// 		ON "quiz"."id" = "questions"."quizId" ORDER BY "quiz"."created_at"
		// `)

	}
}
