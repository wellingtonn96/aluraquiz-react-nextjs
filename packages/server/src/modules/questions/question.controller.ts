import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { Questions } from './entities/question.repository';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
	constructor(private questionService: QuestionService) { }

	@Post()
	async createQuestion(@Body() createQuestionDto: CreateQuestionDto): Promise<Questions> {
		return await this.questionService.createQuestion(createQuestionDto)
	}

	@Get()
	async getAllQuestions(): Promise<Questions[]> {
		return await this.questionService.getQuestions()
	}
}

