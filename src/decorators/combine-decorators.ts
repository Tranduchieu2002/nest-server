import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleEnum } from '../constants/roles';
import { JwtGuard } from '../modules/auth/jwt.guard';
import { LocalAuthGuard } from '../modules/auth/local-auth.guard';

export const AuthDecorators = (
  roles: RoleEnum[] = [],
  options?: Partial<{ isPublic: boolean }>,
) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtGuard(options), LocalAuthGuard /* RolesGuard */),
  );
};
