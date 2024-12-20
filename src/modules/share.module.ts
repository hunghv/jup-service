import { Module } from '@nestjs/common';
import { LoggerService } from '../services/log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerEntity } from '../entities/log/logger.entity';
import { ConfigModule } from '@nestjs/config';
import { TokenService } from 'src/services/token.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([LoggerEntity], 'log_db'),
  ],
  providers: [LoggerService, TokenService],
  exports: [LoggerService, TokenService],
})
export class SharedModule {}
