import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from '../../snake-naming.strategy';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}
  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get frontEndUrl() {
    return this.getString('FRONTEND_DOMAIN');
  }

  get authConfig() {
    return {
      privateKey: this.getString('JWT_PRIVATE_KEY'),
      publicKey: this.getString('JWT_PUBLIC_KEY'),
      jwtExpirationTime: this.getNumber('JWT_EXPIRATION_TIME'),
      refreshKey: this.getString('REFRESH_TOKEN_KEY'),
    };
  }

  get enableDocuments() {
    return this.getBoolean('ENABLE_DOCUMENTATION');
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
    };
  }
  getBoolean(key: string): boolean {
    return Boolean(this.get(key));
  }
  get postgresConfig(): TypeOrmModuleOptions {
    let entities = [
      __dirname + '/../../modules/**/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/*.view-entity{.ts,.js}',
    ];
    let migrations = [__dirname + '/../../migrations/*{.ts,.js}'];
    const entityContext = [__dirname + '/../**/*.entity{.ts,.js}'];

    return {
      entities,
      migrations,
      keepConnectionAlive: !this.isDevelopment,
      dropSchema: this.isDevelopment,
      type: 'postgres',
      name: 'default',
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
      // subscribers: [UserSubscriber],
      migrationsRun: true,
      synchronize: false,
      logging: this.getBoolean('ENABLE_ORM_LOGS'),
      namingStrategy: new SnakeNamingStrategy(),
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
