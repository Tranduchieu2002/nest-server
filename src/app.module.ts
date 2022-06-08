import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import helmet from 'helmet';
@Module({
  imports: [UsersModule, AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet())
  }
}
