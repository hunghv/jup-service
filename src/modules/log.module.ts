import { Module } from '@nestjs/common';
import { LoggerService } from '../services/log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerEntity } from '../entities/log/logger.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_LOG_HOST,
      port: parseInt(process.env.DATABASE_LOG_PORT, 10),
      username: process.env.DATABASE_LOG_USER,
      password: process.env.DATABASE_LOG_PASSWORD,
      database: process.env.DATABASE_LOG_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([LoggerEntity]),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LogModule {}
