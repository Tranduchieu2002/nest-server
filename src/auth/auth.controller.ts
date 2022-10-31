import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SignInDto } from './dtos/signin.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const signInDto: SignInDto = request.body;
    const { refreshToken, accessToken, ...rest } =
      await this.authService.signup({
        email: signInDto.email,
        password: signInDto.password,
      });
    console.log('first');
    const rfTokenExpiresDay = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // 15ds
    response.cookie('accessToken'.toString(), accessToken, {
      expires: new Date(Date.now() + /* 15 * */ 60 * 1000), // 15m * 60s * 1000mls
      httpOnly: true,
    });
    response.cookie('refreshToken', refreshToken, {
      expires: rfTokenExpiresDay, // 15m
      httpOnly: true,
    });
    response.cookie('rfTokenExpiresDay', rfTokenExpiresDay, {
      expires: rfTokenExpiresDay, // 15ds
      httpOnly: true,
    });
    return rest;
  }
  @HttpCode(HttpStatus.OK)
  @Get('login')
  login() {}

  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Req() request: Request) {
    this.authService.refeshToken(request.cookies['user']);
    return {
      message: 'login successed',
    };
  }
}
