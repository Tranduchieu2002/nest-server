import { AuthGuard } from '@nestjs/passport';

export const jwtGuardKey = 'jwt';

export class JwtGuard extends AuthGuard(jwtGuardKey) {}
