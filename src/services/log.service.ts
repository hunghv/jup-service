import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerEntity } from 'src/entities/log/logger.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(LoggerEntity, 'log_db')
    private loggerRepository: Repository<LoggerEntity>,
  ) {}

  async log(message: string) {
    const log = this.createLog('info', message);
    await this.loggerRepository.save(log);
  }

  async warn(message: string) {
    const log = this.createLog('warn', message);
    await this.loggerRepository.save(log);
  }

  async error(message: string, stack?: string) {
    const log = this.createLog('error', message, stack);
    await this.loggerRepository.save(log);
  }

  private createLog(
    level: string,
    message: string,
    stack?: string,
  ): LoggerEntity {
    const log = new LoggerEntity();
    log.timestamp = new Date();
    log.level = level;
    log.message = message;
    log.stack = stack || null;
    return log;
  }
}
