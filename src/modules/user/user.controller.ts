import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
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
    return user.toDto();
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
