import {
  Body,
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
import { UserDto } from 'modules/user/dtos/user.dto';
import { SignInDto } from '../../dtos/auth/signin.dto';
import { UserService } from '../../modules/user/user.service';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userSevicer: UserService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() userRegisterDto: SignInDto): Promise<UserDto> {
    const signInDto: SignInDto = userRegisterDto;
    const user = await this.userSevicer.createUser({
      email: signInDto.email,
      password: signInDto.password,
      remember: false,
    });
    return user.toDto();
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Req() req: Request) {
    const signInDto: SignInDto = req.body;
    if (!signInDto) return;
    const tokenConfigs = await this.authService.generateTokens(signInDto);
    return {
      message: 'ok',
      ...tokenConfigs,
    };
  }

  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const isValidToken = this.authService.validateToken(req.cookies['RF']);
    if (!isValidToken) throw new UnauthorizedException();
    const { accessToken, expirseTime } = await this.authService.refeshToken(
      req.cookies['user'],
    );
    return {
      message: 'ok',
      accessToken,
      expirseTime,
    };
  }
}
