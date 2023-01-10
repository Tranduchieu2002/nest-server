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
import { PageOptionsDto } from '../../modules/base/paginate';
import { BaseMixinController } from '../base/base.controller';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController extends BaseMixinController<UserEntity,UserDto>({name: "users"}) {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Get('me')
  @AuthDecorators()
  @HttpCode(HttpStatus.OK)
  async signIn(@AuthUser() user: UserEntity): Promise<UserDto> {
    return (await this.userService.findOneById(user.id)).toDto();
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
