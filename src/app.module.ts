import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';

import { AuthModule } from './modules/auth/auth.module';
import { PermissionsModule } from './modules/permissions/permission.module';
import { UserModule } from './modules/user/user.module';
import { AppConfigService } from './shared/services/app-configs.service';
import { ApplicationConfigurationsModule } from './modules/application/application.module';
import { CloudinaryModule } from './modules/cloud-dinary/cloudinary.module';
import { UploaderModule } from './modules/uploader/uploader.module';
import { PhotoModule } from './modules/photo/photo.module';
import { ProblemsModule } from './modules/problems/problems.module';
import { QuestionModule  } from "./modules/questions/question.module";

@Module({
  imports: [
    ApplicationConfigurationsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: AppConfigService) => {
        return configService.postgresConfig;
      },
      inject: [AppConfigService],
    }),
    SharedModule,
    UserModule.register({ name: ' duma ', password: 'con me no' }),
    PhotoModule,
    PermissionsModule,
    CloudinaryModule,
    UploaderModule.register(),
    ProblemsModule,
    QuestionModule
  ],
})
export class AppModule {}
