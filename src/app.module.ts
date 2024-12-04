import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConversationModule } from './conversation/conversation.module';
import { MailModule } from './mail/mail.module';
import { UserManagerModule } from './user-manager/user-manager.module';
import { NewsManagerModule } from './news-manager/news-manager.module';
import { CourseManagerModule } from './course-manager/course-manager.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthenticationModule,
    ConversationModule,
    MailModule,
    UserManagerModule,
    NewsManagerModule,
    CourseManagerModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
