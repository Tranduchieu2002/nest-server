import { ExecutionContext } from '@nestjs/common';
import { AuthGuard as NestAuth } from '@nestjs/passport';

export const jwtGuardKey = 'jwt';

export function JwtGuard(options?: Partial<{ isPublic: Boolean }>) {
  let strategyKeys = jwtGuardKey;
  if (options?.isPublic) {
    strategyKeys = 'public';
  }
  return class NestJwtAuth extends NestAuth(strategyKeys) {
    canActivate(context: ExecutionContext) {
      const http = context.switchToHttp();
      const res = http.getResponse();
      const req = http.getRequest();
      req.res = res;
      return super.canActivate(context);
    }
  };
}
