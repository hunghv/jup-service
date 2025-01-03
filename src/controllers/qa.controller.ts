import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { QAService } from '../services';

@Controller('qa')
export class QAController {
  constructor(private readonly qaService: QAService) {}

  // API thêm câu hỏi mới cho khóa học
  @Post('course/:courseId/question')
  async addQuestion(
    @Param('courseId') courseId: string,
    @Body() { userId, content }: { userId: string; content: string },
  ) {
    return this.qaService.addQuestion(courseId, userId, content);
  }

  // API thêm câu trả lời cho câu hỏi
  @Post('question/:questionId/answer')
  async addAnswer(
    @Param('questionId') questionId: string,
    @Body() { userId, content }: { userId: string; content: string },
  ) {
    return this.qaService.addAnswer(questionId, userId, content);
  }

  // API lấy tất cả câu hỏi và câu trả lời của khóa học
  @Get('course/:courseId/questions')
  async getQuestionsWithAnswers(@Param('courseId') courseId: string) {
    return this.qaService.getQuestionsWithAnswers(courseId.toString());
  }
}
