import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';

import { AuthModule } from './modules/auth/auth.module';
import { PermissionsModule } from './modules/permissions/permission.module';
import { UserModule } from './modules/user/user.module';
import { AppConfigService } from './shared/services/app-configs.service';
import { RolesModule } from './modules/role/role.module';
import { ApplicationConfigurationsModule } from './modules/application/application.module';
import { CloudinaryModule } from './modules/cloud-dinary/cloudinary.module';

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
    PermissionsModule,
    CloudinaryModule,
  ],
})
export class AppModule {}
