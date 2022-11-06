import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'modules/user/user.module';
import { AppConfigService } from 'shared/services/app-configs.service';
import { SharedModule } from 'shared/shared.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './services/auth.service';

export interface IJwtConfigs {
  rfExpiresAt: number;
  acExpiresAt: number;
  expiresIn?: number;
}

@Module({
  exports: [AuthService, JwtModule],
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ session: false }),
    JwtModule.registerAsync({
      useFactory: (configService: AppConfigService) => {
        return {
          privateKey: configService.authConfig.privateKey,
          publicKey: configService.authConfig.publicKey,
          signOptions: {
            algorithm: 'RS256',
            expiresIn: configService.authConfig.jwtExpirationTime,
          },
          verifyOptions: {
            algorithms: ['RS256'],
          },
        };
      },
      inject: [AppConfigService],
    }),
    UserModule.register({ name: 'duma', password: '1' }),
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}