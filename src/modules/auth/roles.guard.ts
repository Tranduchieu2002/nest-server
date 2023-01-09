import { RoleEnum } from '@server/constants';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserDto } from '../user/dtos/user.dto';
import { RoleDto } from '../role/role.dto';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<RoleEnum[]>('roles', context.getHandler());
    if (!roles) return true;
    const request = context.switchToHttp().getRequest();
    const user :UserDto= request?.user;
    const roleUser: RoleDto[] | undefined = user.roles;
    if (!roleUser) return false;
    return validateRequest(roleUser, roles);
  }
}

function validateRequest(
  roleUser: RoleDto[],
  roles: RoleEnum[],
): boolean | Promise<boolean> | Observable<boolean> {
  return roles.some(role => roleUser.map(roleU => roleU.name));
}
