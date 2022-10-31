import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Auth } from 'auth/auth.decorator';

@Controller('user')
export class UserController {
  @Get('signin')
  @Auth()
  @HttpCode(HttpStatus.OK)
  signIn() {
    return {
      message: 'successed',
    };
  }
}
