import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { IJwtConfigs } from 'modules/auth/auth.module';
import { UserService } from 'modules/user/user.service';
import { AppConfigService } from 'shared/services/app-configs.service';

@Injectable({})
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userSevice: UserService,
    private configService: AppConfigService,
  ) {}
  async validateUser(payload: { email: string; password: string }) {
    const user = await this.userSevice.findOne(payload);
    if (!user) return null;
    return {
      email: user.email,
    };
  }

  async signup(payload: string | object | Buffer) {
    const { accessToken, refreshToken } = await this.generateTokens(payload);
    // connect db return user
    return {
      message: 'login successed!',
      user: payload,
    };
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
