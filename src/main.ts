import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { FirebaseAuthGuard } from './utils/firebase-auth.guard';
import { UserRepository } from './repositories/user.repository';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Jito kosovo project')
    .setDescription('Jito kosovo project')
    .setVersion('1.0')
    .addTag('Jito kosovo')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  const userRepository = app.get(UserRepository);

  app.useGlobalGuards(
    new FirebaseAuthGuard(app.get(Reflector), userRepository),
  );

  app.enableCors({
    origin: ['https://jito-ui.vercel.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
