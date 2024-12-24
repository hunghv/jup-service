import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { FirebaseAuthGuard } from './utils/firebase-auth.guard';
import { UserRepository } from './repositories/user.repository';
import { GlobalExceptionFilter } from './middleware/globalFilter.middleware';

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
    // origin: (origin, callback) => {
    //   const allowedOrigins = [
    //     'https://jup-admin.vercel.app',
    //     'http://localhost:3000',
    //     'http://localhost:9000/',
    //     '*',
    //   ];

    //   if (!origin || allowedOrigins.includes(origin)) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // },
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authentication, Authorization, authorization, Access-control-allow-credentials, Access-control-allow-headers, Access-control-allow-methods, Access-control-allow-origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma',
  });

  app.useGlobalFilters(new GlobalExceptionFilter());

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
