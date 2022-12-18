import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from 'constants/roles';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<RoleEnum[]>('roles', context.getHandler());
    if (!roles) return true;
    const request = context.switchToHttp().getRequest();
    const roleUser: RoleEnum | undefined = request.body.role;
    if (!roleUser) return false;
    return validateRequest(roleUser, roles);
  }
}

function validateRequest(
  roleUser: RoleEnum,
  roles: RoleEnum[],
): boolean | Promise<boolean> | Observable<boolean> {
  return roles.includes(roleUser);
}
