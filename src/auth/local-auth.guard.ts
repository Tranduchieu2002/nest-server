import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const AUTH_GUARD_KEY = 'local';
@Injectable()
export class LocalAuthGuard extends AuthGuard(AUTH_GUARD_KEY) {}
// export function AuthUser() {
//   return createParamDecorator((_data: unknown, context: ExecutionContext) => {
//     const request = context.switchToHttp().getRequest();

//     const user = request.user;

//     if (user?.[Symbol.for('isPublic')]) {
//       return;
//     }

//     return user;
//   })();
// }
