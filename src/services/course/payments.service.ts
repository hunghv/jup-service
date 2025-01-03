import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course, Payment, User } from '../../entities';
import { CreatePaymentDto } from '../../models/dtos';
@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment, 'app_db')
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(User, 'app_db')
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Course, 'app_db')
    private readonly coursesRepository: Repository<Course>,
  ) {}

  // Tạo mới thanh toán
  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const user = await this.usersRepository.findOne({
      where: { id: createPaymentDto.userId },
    });
    const course = await this.coursesRepository.findOne({
      where: { id: createPaymentDto.courseId },
    });

    if (!user) {
      throw new Error('User not found');
    }
    if (!course) {
      throw new Error('Course not found');
    }

    const payment = this.paymentsRepository.create({
      user,
      course,
      amount: createPaymentDto.amount,
      status: createPaymentDto.status || 'pending',
    });

    return this.paymentsRepository.save(payment);
  }

  // Lấy tất cả thanh toán
  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({ relations: ['user', 'course'] });
  }

  // Tìm kiếm thanh toán theo ID
  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
      relations: ['users', 'courses'],
    });
    if (!payment) {
      throw new Error('Payment not found');
    }
    return payment;
  }

  // Cập nhật trạng thái thanh toán (nếu cần)
  async updateStatus(id: string, status: string): Promise<Payment> {
    const payment = await this.findOne(id);
    payment.status = status;
    return this.paymentsRepository.save(payment);
  }
}
