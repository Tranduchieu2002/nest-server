import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppConfigService } from 'shared/services/app-configs.service';
import { SignInDto } from './dtos/signin.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: AppConfigService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const signInDto: SignInDto = request.body;
    const user = await this.authService.signup({
      email: signInDto.email,
      password: signInDto.password,
    });
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Req() req: Request) {
    const signInDto: SignInDto = req.body;
    if (!signInDto) return;
    const tokenConfigs = await this.authService.generateTokens(signInDto);
    console.log(tokenConfigs);
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
