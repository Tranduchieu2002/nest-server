import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ROLES } from '../../constants/roles';
import { AuthDecorators } from '../../decorators/combine-decorators';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @AuthDecorators([ROLES.ADMIN, ROLES.USER])
  @HttpCode(HttpStatus.OK)
  signIn() {
    return {
      message: 'successed',
    };
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
