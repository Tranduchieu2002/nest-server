import { applyDecorators } from '@nestjs/common';

export const AuthDecorators = (roles: ROLES[]) => {
  return applyDecorators();
};
