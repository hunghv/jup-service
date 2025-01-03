import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question, Answer, Course, User } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class QAService {
  constructor(
    @InjectRepository(Question, 'app_db')
    private questionRepository: Repository<Question>,

    @InjectRepository(Answer, 'app_db')
    private answerRepository: Repository<Answer>,

    @InjectRepository(Course, 'app_db')
    private courseRepository: Repository<Course>,

    @InjectRepository(User, 'app_db')
    private userRepository: Repository<User>,
  ) {}

  // Thêm câu hỏi mới cho khóa học
  async addQuestion(courseId: string, userId: string, content: string) {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!course || !user) {
      throw new Error('Course or User not found');
    }

    const question = this.questionRepository.create({
      content,
      course,
      user,
    });

    return this.questionRepository.save(question);
  }

  // Thêm câu trả lời cho câu hỏi
  async addAnswer(questionId: string, userId: string, content: string) {
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!question || !user) {
      throw new Error('Question or User not found');
    }

    const answer = this.answerRepository.create({
      content,
      question,
      user,
    });

    return this.answerRepository.save(answer);
  }

  // Lấy câu hỏi cùng với các câu trả lời của khóa học
  async getQuestionsWithAnswers(courseId: string) {
    const questions = await this.questionRepository.find({
      where: { course: { id: courseId } },
      relations: ['answers', 'answers.user', 'user'], // Liên kết với câu trả lời và người trả lời
    });

    return questions;
  }
}
