import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'shared/services/app-configs.service';
import { UserService } from 'user/user.service';

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
    return {
      message: 'login successed!',
      accessToken,
      refreshToken,
    };
  }

  async refeshToken(payload) {
    const accessToken = await this.generateAccessToken(payload);
    return {
      accessToken,
    };
  }

  async generateTokens(payload): Promise<{
    refreshToken: string;
    accessToken: string;
  }> {
    const accessToken = await this.generateAccessToken(payload);
    const rtExpiresTime = '15d';

    const generateRfToken = await this.jwtService.signAsync(payload, {
      expiresIn: rtExpiresTime,
    });
    return {
      accessToken,
      refreshToken: generateRfToken,
    };
  }
  async generateAccessToken(payload): Promise<string> {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.authConfig.jwtExpirationTime,
    });
    return accessToken;
  }
}
