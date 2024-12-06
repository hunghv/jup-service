import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';
import { ConfigModule } from '@nestjs/config';
import { LogModule } from './modules/log.module';
import { LoggerEntity } from './entities/log/logger.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      name: 'app_db',
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'log_db',
      type: 'mysql',
      host: process.env.DATABASE_LOG_HOST,
      port: parseInt(process.env.DATABASE_LOG_PORT, 10),
      username: process.env.DATABASE_LOG_USER,
      password: process.env.DATABASE_LOG_PASSWORD,
      database: process.env.DATABASE_LOG_NAME,
      entities: [LoggerEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
