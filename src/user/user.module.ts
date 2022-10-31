import { DynamicModule, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

interface UserConfigs {
  name: string;
  password: string;
}

const userConfigs: UserConfigs = {
  name: 'hieu',
  password: '1234',
};
@Module({})
export class UserModule {
  static register(data: UserConfigs): DynamicModule {
    return {
      module: UserModule,
      // imports: [forwardRef(() => AuthModule)],
      exports: [UserService],
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: 'USER_CONFIGS',
          useValue: data,
        },
      ],
    };
  }
}
