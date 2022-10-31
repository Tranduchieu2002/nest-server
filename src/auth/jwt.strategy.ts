import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from 'shared/services/app-configs.service';
import { jwtGuardKey } from './jwt.guard';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, jwtGuardKey) {
  constructor(private configService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.authConfig.publicKey,
    });
  }

  private static extractJWT(req: Request): string | null {
    console.log(req.cookies);
    if (req.cookies && 'accessToken' in req.cookies) {
      return req.cookies.accessToken;
    }
    return null;
  }
  async validate(payload: any) {
    return payload;
  }
}
