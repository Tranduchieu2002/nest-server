import { RoleEnum, ROLES } from '../constants/roles';
import {
  generateAdminPermissions,
  generateUserPermissions,
} from './permissions';

export const RoleHasPermissions = (roleInstance: RoleEnum): [] | string[] => {
  switch (roleInstance) {
    case ROLES.ADMIN:
      return generateAdminPermissions();
    case ROLES.USER:
      return generateUserPermissions();
    default:
      return [];
  }
};
