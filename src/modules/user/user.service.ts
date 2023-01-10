import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { PostNotFoundException } from '../../exceptions/not-found';
import { UseDto } from '../../decorators';
import { BcryptService } from '../auth/services/bcrypt.service';
import { UpdateUserDto } from './dtos/user-update.dto';

@Injectable()
@UseDto(UserDto)
export class UserService extends BaseService<UserEntity, UserDto> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionsEntity)
    private readonly permissionRepository: Repository<PermissionsEntity>,
    private readonly bcryptService: BcryptService
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

  async update(id: Uuid, userDto: UpdateUserDto): Promise<UserEntity> {
    const currentUser = await this.findOneById(id)
      
    if (userDto.password) {
      if (userDto.oldPassword) {
        const isValidOldPassword = await this.bcryptService.verifyHash(
          userDto.oldPassword,
          currentUser.password,
        );

        if (!isValidOldPassword) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                oldPassword: 'incorrectOldPassword',
              },
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              oldPassword: 'missingOldPassword',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    await this.userRepository.update(currentUser.id, userDto);

    return this.findOneById(currentUser.id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.userRepository.findOne({
      where: { email },
      relations: {
        roles: true
      }
    })
    return user
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
