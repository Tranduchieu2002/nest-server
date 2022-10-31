import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import Cookie from 'cookie-parser';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost',
      methods: '*',
    },
  });
  ConfigModule.forRoot({
    envFilePath: '.env.devlopment',
    isGlobal: true,
  });
  app.use(Cookie());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
