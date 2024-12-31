import { Module } from '@nestjs/common';
import { LoggerService } from '../services/log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerEntity } from '../entities/log/logger.entity';
import { ConfigModule } from '@nestjs/config';
import { TokenService } from '../services/token.service';
import { MasterData } from '../entities/masterdata.entity';
import { MasterDataService } from '../services/masterdata.service';
import { MasterDataController } from '../controllers/masterdata.controller';
import { EmailService } from '../services/email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([MasterData], 'app_db'),
    TypeOrmModule.forFeature([LoggerEntity], 'log_db'),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        port: 587,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@duketeam.com>',
      },
    }),
  ],
  providers: [LoggerService, TokenService, MasterDataService, EmailService],
  exports: [LoggerService, TokenService, EmailService],
  controllers: [MasterDataController],
})
export class SharedModule {}
