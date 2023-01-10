import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsEntity } from '../../modules/permissions/permission.entity';
import { RoleEntity } from '../../modules/role/role.entity';
import { BcryptService } from '../auth/services/bcrypt.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
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
      imports: [
        TypeOrmModule.forFeature([UserEntity, RoleEntity, PermissionsEntity]),
      ],
      exports: [UserService],
      controllers: [UserController],
      providers: [
        UserService,
        BcryptService,
        {
          provide: 'USER_CONFIGS',
          useValue: data,
        },
      ],
    };
  }
}
