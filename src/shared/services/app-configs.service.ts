import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}
  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get authConfig() {
    return {
      privateKey: this.getString('JWT_PRIVATE_KEY'),
      publicKey: this.getString('JWT_PUBLIC_KEY'),
      jwtExpirationTime: this.getNumber('JWT_EXPIRATION_TIME'),
    };
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
    };
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }
  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/gm, '\n');
  }
  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }
  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (!value) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }
}
