import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { dataSource } from './data-source/postgresql.datasouce';
import { CreateRoles } from './migrations/1add-roles.migration';
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

  dataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized successfully.');
      new CreateRoles().up(dataSource.createQueryRunner('master'));
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });
  await app.listen(3000);
}

bootstrap();
