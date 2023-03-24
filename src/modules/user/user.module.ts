import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsEntity } from '../../modules/permissions/permission.entity';
import { RoleEntity } from '../../modules/role/role.entity';
import { BcryptService } from '../auth/services/bcrypt.service';
import { PermissionsSevice } from '../permissions/permisson.service';
import { PhotoModule } from '../photo/photo.module';
import { PhotoService } from '../photo/photo.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

interface UserConfigs {
  name: string;
  password: string;
}

export class UserModule {
  static register(data: UserConfigs): DynamicModule {
    return {
      module: UserModule,
      imports: [
        TypeOrmModule.forFeature([UserEntity, RoleEntity, PermissionsEntity]),
        PhotoModule
      ],
      exports: [UserService],
      controllers: [UserController],
      providers: [
        UserService,
        BcryptService,
        PermissionsSevice,
        {
          provide: 'USER_CONFIGS',
          useValue: data,
        },
      ],
    };
  }
}
