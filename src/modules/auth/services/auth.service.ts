import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserEntity } from 'modules/user/user.entity';
import { SignInDto } from '../../../dtos/auth/signin.dto';
import { UserAlreadyExistException } from '../../../exceptions/exist-email';
import { IJwtConfigs } from '../../../modules/auth/auth.module';
import { UserService } from '../../../modules/user/user.service';
import { AppConfigService } from '../../../shared/services/app-configs.service';
import { BcryptService } from './bcrypt.service';

@Injectable({})
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly userSevice: UserService,
    private configService: AppConfigService,
    private bcryptService: BcryptService,
  ) {}
  async validateUser(email: string, password: string) {
    try {
      const user = await this.userSevice.findOne({
        email,
      });

      if (!user) return null;

      const isValidPassword = await this.verifyPassword(
        password,
        user.password,
      );
      console.log({ isValidPassword });
      return user;
    } catch (error) {
      throw new HttpException(
        "User and password doesn't match",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async registation(signupDto: SignInDto): Promise<UserEntity> {
    // found email
    let user: UserEntity;
    try {
      // const alreadyExist = await this.userService.findByEmail(signupDto.email);
      // console.log({ alreadyExist });
      // if (alreadyExist) throw new UserAlreadyExistException();
      signupDto.password = this.bcryptService.generateHash(signupDto.password);

      user = await this.userService.createUser(signupDto);

      const { accessToken, refreshToken } = await this.generateTokens(
        signupDto,
      );
    } catch (error) {
      throw new UserAlreadyExistException();
    }

    // connect db return user
    return user;
  }
  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await this.bcryptService.verifyHash(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        "Email or password don't match ",
        HttpStatus.BAD_REQUEST,
      );
    }
    return !!isPasswordMatching;
  }
  async refeshToken(payload) {
    const { accessToken, expiresIn } = await this.generateAccessToken(payload);
    return {
      expirseTime: new Date(Date.now() + /* 15 * */ 60 * 1000),
      accessToken,
      expiresIn,
    };
  }

  async generateTokens(payload): Promise<
    {
      refreshToken: string;
      accessToken: string;
    } & IJwtConfigs
  > {
    const { expiresIn, accessToken } = await this.generateAccessToken(payload);
    const rtExpiresTime = '15d';
    const JWTConfigs: IJwtConfigs = {
      rfExpiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).getTime(), // 15ds
      acExpiresAt: new Date(Date.now() + expiresIn * 1000).getTime(),
    };
    const generateRfToken = await this.jwtService.signAsync(payload, {
      expiresIn: rtExpiresTime,
    });
    return {
      accessToken,
      refreshToken: generateRfToken,
      expiresIn,
      ...JWTConfigs,
    };
  }

  setTokenToCookie(
    response: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    const rfTokenExpiresDay = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // 15ds
    const acExpiresDay = new Date(Date.now() + /* 15 * */ 60 * 1000);
    response.cookie('ac'.toString(), accessToken, {
      expires: acExpiresDay, // 15m * 60s * 1000mls
      httpOnly: false,
    });
    response.cookie('RF', refreshToken, {
      expires: rfTokenExpiresDay, // 15m
      httpOnly: false,
    });
    response.cookie('RFExpiresDay', rfTokenExpiresDay, {
      expires: rfTokenExpiresDay, // 15ds
      httpOnly: true,
    });
  }

  async generateAccessToken(payload): Promise<{
    accessToken: string;
    expiresIn: number;
  }> {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.authConfig.jwtExpirationTime,
    });
    return {
      accessToken,
      expiresIn: this.configService.authConfig.jwtExpirationTime,
    };
  }
  validateToken(token: string) {
    return !!this.jwtService.verify(token, {
      publicKey: this.configService.authConfig.publicKey,
    });
  }
}
