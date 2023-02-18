import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthDecorators } from '../../decorators/combine-decorators';
import { SignUpDto } from '../../dtos/auth/signin.dto';
import { UserDto } from '../../modules/user/dtos/user.dto';
import { UserService } from '../../modules/user/user.service';
import { AppConfigService } from '../../shared/services/app-configs.service';
import { UserEntity } from '../user/user.entity';
import { LoginPayloadDto, RefreshTokenPayloadDto, RefreshTokenResponseDto } from './dto/signin.dto';
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
  async signUp(@Body() userRegisterDto: SignUpDto): Promise<UserDto> {
    const SignUpDto: SignUpDto = userRegisterDto;
    const user = await this.authService.registation({
      email: SignUpDto.email,
      password: String(SignUpDto.password),
      remember: false,
      name: String(SignUpDto.name)
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
    const userDto = user.toDto({isHasRoles: true});
    console.log(userDto)
    const tokenConfigs = await this.authService.generateTokens({...userDto});
    return new LoginPayloadDto(userDto, tokenConfigs);
  }


  @Post('refresh')
  @ApiOkResponse({
    type: RefreshTokenResponseDto,
    description: "Get accessToken by refreshToken",
  })
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Body() body: RefreshTokenPayloadDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const acToken = body?.access_token;
    const refeshToken = body?.refresh_token;
    if (!refeshToken || !acToken) throw new BadRequestException();
    const user = this.authService.jwtDecode(acToken as string);
    const isValidToken = this.authService.validateToken(refeshToken as string);
    if (!isValidToken) throw new UnauthorizedException();
    const { accessToken, expirseTime } = await this.authService.refeshToken(
      JSON.stringify(new UserDto(user as UserEntity)),
    );
    return new RefreshTokenResponseDto({
      message: 'ok',
      access_token: accessToken,
      expirseTime,
    })
  }
}
