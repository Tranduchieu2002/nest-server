import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PageOptionsDto, Pagination } from '../../modules/base/paginate';

import { RoleEnum } from '../../constants/roles';
import { SignUpDto } from '../../dtos/auth/signin.dto';
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

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({
      email,
    });
  }

  async createUser(userRegisterDto: SignUpDto): Promise<UserEntity> {
    const user = this.userRepository.create(userRegisterDto);
    const permissions = await this.roleRepository.find({
      relations: {
        permissions: true,
      },
      where: {
        name: RoleEnum.USER,
      },
    });
    user.roles = permissions;
    this.userRepository.save(user);
    return user;
  }

  async getMany(pageOptions: PageOptionsDto): Promise<Pagination<UserEntity>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    try {
      const data = await queryBuilder.paginate(pageOptions);

      return data;
    } catch (error) {
      throw new NotFoundException(HttpStatus.NOT_FOUND, 'not found');
    }
  }
}
