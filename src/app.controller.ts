import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from 'winston';
import { LogService } from './services/log.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logService: LogService,
  ) {}
  @Get()
  getHello(): string {
    this.logService.log('This is an info message');
    this.logService.error('This is an error message');
    this.logService.warn('This is a warning message');
    return this.appService.getHello();
  }
}
