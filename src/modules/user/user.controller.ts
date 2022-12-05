import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthUser } from '../../decorators/auth-user';
import { AuthDecorators } from '../../decorators/combine-decorators';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @AuthDecorators()
  @HttpCode(HttpStatus.OK)
  signIn(@AuthUser() user: UserEntity): UserDto {
    return user;
  }

  @Delete(':id')
  @AuthDecorators()
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id') id: string) {
    return this.userService.softDelete(id as Uuid);
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
