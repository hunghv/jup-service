import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './share.module';
import { LoggerEntity } from '../entities/log/logger.entity';
import { TokenMiddleware } from '../middleware/token.middleware';
import { AuthModule } from './auth.module';
import { ChatModule } from './chat.module';
import { CloudinaryModule } from './cloudinary.module';

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
    AuthModule,
    UserModule,
    SharedModule,
    ChatModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('*'); // Áp dụng middleware cho tất cả các routes
  }
}
