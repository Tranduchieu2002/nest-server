import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ROLES } from '../constants/roles';
import { JwtGuard } from '../modules/auth/jwt.guard';
import { LocalAuthGuard } from '../modules/auth/local-auth.guard';

export const AuthDecorators = (roles: ROLES[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtGuard, LocalAuthGuard /* RolesGuard */),
  );
};
