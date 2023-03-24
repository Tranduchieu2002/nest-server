import { Order, RoleEnum } from '@server/constants';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { AuthUser } from '../../decorators';
import { AuthDecorators } from '../../decorators/combine-decorators';
import { PageOptionsDto, Pagination } from '../../modules/base/paginate';
import { BaseMixinController, OptionsMixinController } from '../base/base.controller';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionsSevice } from '../permissions/permisson.service';
import { StringConverter } from '../../utils';
import moment from 'moment';

const options: OptionsMixinController = {
  name: "user",
  defaultSearchByFields: ["createdAt"],
  sort: Order.DESC
}
@Controller('user')
export class UserController extends BaseMixinController<UserEntity, UserDto>(options) {
  constructor(private readonly userService: UserService,
    @InjectRepository(UserEntity) userRepository: Repository<UserEntity>,
    private readonly permissionService: PermissionsSevice
  ) {
    super(userService, userRepository);
    if (userRepository) this.createQueryBuilderDefault()
  }

  @Get()
  @AuthDecorators([RoleEnum.ADMIN])
  @HttpCode(HttpStatus.OK)
  getUsers(pageOptions: PageOptionsDto): Promise<Pagination<UserEntity>> {
    return this.userService.getUsers(pageOptions, this.queryBuilder)
  }


  @Get('me')
  @AuthDecorators([RoleEnum.USER])
  @HttpCode(HttpStatus.OK)
  async signIn(@AuthUser() user: UserEntity): Promise<UserDto> {
    return (await this.userService.userByRelations(user.id, { avatar: true, roles: true })).toDto({ isAvatar: true });
  }

  @AuthDecorators([RoleEnum.USER])
  @Get(":id/permissions")
  @HttpCode(HttpStatus.OK)
  getUserPermission(@Param("id") userId: Uuid) {
    return this.permissionService.getUserPermissions(userId);
  }
  @Get(':id')
  @AuthDecorators([RoleEnum.USER])
  @HttpCode(HttpStatus.CREATED)
  async getUserDetail(@Param('id') id: Uuid) {
  const userInfo = await this.userService.userByRelations(id, { roles: true });
  return userInfo.toDto({ isAvatar: true })
  }

  @Patch(':id')
  @AuthDecorators([RoleEnum.USER])
  @HttpCode(HttpStatus.OK) 
  async editUser(@Param('id') id: Uuid, @Body() body: any) {
    let userModify = body;
    if(body?.fullName) {
    Object.assign(
      userModify,
      StringConverter.splitName(userModify.fullName)
      )
    }
    if(userModify?.dateOfBirth) {
      userModify.dateOfBirth = moment(userModify.dateOfBirth).toDate();
    }
    delete userModify.fullName
    return (await this.userService.updateUser(id, userModify)).toDto();
  }
}
