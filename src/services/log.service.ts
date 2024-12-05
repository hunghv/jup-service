import { Injectable } from '@nestjs/common';
import { createLogger, transports, format, Logger as WinstonLogger } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LogService {
  private readonly logger: WinstonLogger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
      transports: [
        new transports.Console(),
        new DailyRotateFile({
          filename: 'logs/%DATE%-app.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
