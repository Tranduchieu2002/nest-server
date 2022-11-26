import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserDto } from 'modules/user/dtos/user.dto';
import { SignInDto } from '../../dtos/auth/signin.dto';
import { UserService } from '../../modules/user/user.service';
import { Auth } from './auth.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userServicer: UserService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() userRegisterDto: SignInDto): Promise<UserDto> {
    const signInDto: SignInDto = userRegisterDto;
    const user = await this.authService.registation({
      email: signInDto.email,
      password: String(signInDto.password),
      remember: false,
    });
    return user.toDto();
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request) {
    const signInDto = req.body;
    const user = (await this.userServicer.findByEmail(signInDto.email)).toDto();

    console.log(user);
    const tokenConfigs = await this.authService.generateTokens({ ...user });
    return {
      message: 'ok',
      user,
      ...tokenConfigs,
    };
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth()
  me() {
    return 'ok';
  }

  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refeshToken = req.query.rf;
    if (!refeshToken) throw new BadRequestException();
    const isValidToken = this.authService.validateToken(refeshToken as string);
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
