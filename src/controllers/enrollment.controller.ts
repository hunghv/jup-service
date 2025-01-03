import { Controller, Post, Body } from '@nestjs/common';
import { CreateEnrollmentDto } from '../models/dtos';
import { EnrollmentsService } from '../services';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  async enroll(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.enrollInCourse(createEnrollmentDto);
  }
}
