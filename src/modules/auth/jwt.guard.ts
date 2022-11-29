import { AuthGuard as NestAuth } from '@nestjs/passport';

export const jwtGuardKey = 'jwt';

export function JwtGuard(options?: Partial<{ isPublic: Boolean }>) {
  let strategyKeys = jwtGuardKey;
  if (options?.isPublic) {
    strategyKeys = 'public';
  }
  return NestAuth(strategyKeys);
}
