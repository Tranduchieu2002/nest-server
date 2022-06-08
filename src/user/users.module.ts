import { userMiddleWare } from './middlewares/user.middleware';
import { UsersService } from './users.service';
/*
https://docs.nestjs.com/modules
*/

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(userMiddleWare)
      .exclude({
        path: 'users',
        method: RequestMethod.DELETE,
      },'users/(.*)'
      )
      .forRoutes(UsersController);
  }
}
