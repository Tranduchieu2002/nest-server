import { applyDecorators } from '@nestjs/common';
import { ROLES } from 'constants/roles';

export const AuthDecorators = (roles: ROLES[]) => {
  return applyDecorators();
};
