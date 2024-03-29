import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, SelectQueryBuilder } from 'typeorm';
import { PageMetaDto, PageOptionsDto, Pagination } from '../../modules/base/paginate';

import { RoleEnum } from '../../constants/roles';
import { SignUpDto } from '../../dtos/auth/signUp.dto';
import { BaseService } from '../../modules/base/base.service';
import { PermissionsEntity } from '../../modules/permissions/permission.entity';
import { RoleEntity } from '../../modules/role/role.entity';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';
import { PostNotFoundException } from '../../exceptions/not-found';
import { UseDto } from '../../decorators';
import { BcryptService } from '../auth/services/bcrypt.service';
import { UpdateUserDto } from './dtos/user-update.dto';
import { PhotoService } from '../photo/photo.service';
import { remove } from 'lodash';

@UseDto(UserDto)
export class UserService extends BaseService<UserEntity, UserDto> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionsEntity)
    private readonly permissionRepository: Repository<PermissionsEntity>,
    private readonly bcryptService: BcryptService,
    private readonly photoService: PhotoService
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

  async userByRelations(id: string, relations?: { roles?: boolean, avatar?: boolean }) : Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id :  id as any },
      relations: {
        avatar: true,
        ...relations
      }
    })
    console.log(user)
    if(!user) {
      throw new NotFoundException("Not found!")
    }
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

  async getUsers(pageOptions: PageOptionsDto, queryBuilder: SelectQueryBuilder<UserEntity>): Promise<Pagination<UserEntity>> {
    try {
      const [items, pageMetaDto] = await queryBuilder.paginate(pageOptions);
      return items.toPageDto(pageMetaDto);
    } catch (error) {
      throw new NotFoundException(HttpStatus.NOT_FOUND, 'not found');
    }
  } 
  async updateUser(userId: Uuid, data: any) {
    const userInstance = await this.findOneById(userId);
    if(data?.avatar) {
      const photoInstance = await this.photoService.updatePhoto(data.avatar);
      userInstance.avatar = photoInstance;
    }
    
    delete data.avatar;
    console.log(data)

    Object.keys(data).forEach((key, i) => {
      userInstance[key] = data[key]
    })

    return this.userRepository.save(userInstance);

  }
}
