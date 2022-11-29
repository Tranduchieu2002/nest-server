import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { generateUserPermissions } from '../../configs/permissions';

import { QueryHandlerNotFoundException } from '@nestjs/cqrs';
import { RoleEnum } from '../../constants/roles';
import { SignInDto } from '../../dtos/auth/signin.dto';
import { BaseService } from '../../modules/base/base.service';
import { PermissionsEntity } from '../../modules/permissions/permission.entity';
import { RoleEntity } from '../../modules/role/role.entity';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService extends BaseService<UserEntity, UserDto> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionsEntity)
    private readonly permissionRepository: Repository<PermissionsEntity>,
  ) {
    super(userRepository);
  }
  async findOne(
    findData: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity | null> {
    return this.userRepository
      .createQueryBuilder('users')
      .where(`users.email = :email`, {
        email: findData.email,
      })
      .getOne();
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneByOrFail({
      email,
    });
  }

  async createUser(userRegisterDto: SignInDto): Promise<UserEntity> {
    const user = this.userRepository.create(userRegisterDto);

    const generatedPermission = generateUserPermissions(
      this.permissionRepository,
    );

    const permissions = await this.permissionRepository.insert(
      generatedPermission,
    );

    const role = await this.roleRepository.findOne({
      where: {
        name: RoleEnum.USER,
      },
    });
    if (role === null) throw new QueryHandlerNotFoundException('aa');
    role.permissions = permissions.generatedMaps as PermissionsEntity[];
    user.role = [role];
    this.roleRepository.save(role);
    this.userRepository.save(user);
    return user;
  }
}
