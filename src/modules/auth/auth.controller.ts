import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserEntity } from 'modules/user/user.entity';
import { AuthDecorators } from '../../decorators/combine-decorators';
import { SignInDto } from '../../dtos/auth/signin.dto';
import { UserDto } from '../../modules/user/dtos/user.dto';
import { UserService } from '../../modules/user/user.service';
import { AppConfigService } from '../../shared/services/app-configs.service';
import { LoginPayloadDto } from './dto/signin.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configsService: AppConfigService,
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

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async login(@Body() userLogin: UserLoginDto): Promise<LoginPayloadDto> {
    const user = await this.userService.findByEmail(userLogin.email);
    if (!user) throw new NotFoundException();
    user.toDto();
    const tokenConfigs = await this.authService.generateTokens({ ...user });

    return new LoginPayloadDto(user, tokenConfigs);
  }

  @Get('refresh')
  @AuthDecorators()
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refeshToken = req.query.rf;
    const acToken = req.query.ac;
    if (!refeshToken || !acToken) throw new BadRequestException();
    const user = this.authService.jwtDecode(acToken as string);
    const isValidToken = this.authService.validateToken(refeshToken as string);
    if (!isValidToken) throw new UnauthorizedException();
    const { accessToken, expirseTime } = await this.authService.refeshToken(
      JSON.stringify(new UserDto(user as UserEntity)),
    );
    return {
      message: 'ok',
      accessToken,
      expirseTime,
    };
  }
}
