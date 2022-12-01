import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleEnum } from '../constants/roles';
import { JwtGuard } from '../modules/auth/jwt.guard';

export function AuthDecorators(
  roles: RoleEnum[] = [],
  options?: Partial<{ isPublic: boolean }>,
) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtGuard(options)),
  );
}
