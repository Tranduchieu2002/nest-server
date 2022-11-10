import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AppConfigService } from './shared/services/app-configs.service';
import { SharedModule } from './shared/shared.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const configService = app.select(SharedModule).get(AppConfigService);
  app.enableCors({
    origin: configService.frontEndUrl,
    credentials: true,
  });
  ConfigModule.forRoot({
    envFilePath: '.env.devlopment',
    isGlobal: true,
  });
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
