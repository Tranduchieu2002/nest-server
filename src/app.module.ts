import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'auth/auth.module';
import { SharedModule } from 'shared/shared.module';
import { UserModule } from 'user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    SharedModule,
    UserModule.register({ name: ' duma ', password: 'con me no' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
