import { Order, RoleEnum } from '@server/constants';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
  @AuthDecorators()
  @HttpCode(HttpStatus.OK)
  async signIn(@AuthUser() user: UserEntity): Promise<UserDto> {
    return (await this.userService.findOneById(user.id)).toDto();
  }

  @AuthDecorators([RoleEnum.USER])
  @Get("permissions/:id")
  @HttpCode(HttpStatus.OK)
  getUserPermission(@Param(":id") userId: Uuid) {
    return this.permissionService.getUserPermissions(userId);
  }
  // @Post('create')
  // @HttpCode(HttpStatus.CREATED)
  // create(@Body() user: UserDto) {
  //   this.userService.createUser(user);
  //   return {
  //     message: 'ok',
  //   };
  // }
}
