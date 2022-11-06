import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'modules/auth/auth.module';
import { UserModule } from 'modules/user/user.module';
import { AppConfigService } from 'shared/services/app-configs.service';
import { SharedModule } from 'shared/shared.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: AppConfigService) => {
        return configService.postgresConfig;
      },
      inject: [AppConfigService],
    }),
    SharedModule,
    UserModule.register({ name: ' duma ', password: 'con me no' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
