import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { Payment } from '../entities';
import { CreatePaymentDto } from '../models/dtos';
import { PaymentsService } from '../services';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Tạo thanh toán mới
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.create(createPaymentDto);
  }

  // Lấy tất cả thanh toán
  @Get()
  findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  // Lấy thông tin thanh toán theo ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Payment> {
    return this.paymentsService.findOne(id);
  }

  // Cập nhật trạng thái thanh toán
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() status: string,
  ): Promise<Payment> {
    return this.paymentsService.updateStatus(id, status);
  }
}
