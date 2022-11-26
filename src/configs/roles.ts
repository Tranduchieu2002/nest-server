import { ROLES } from '../constants/roles';
import { AccessibleSystem } from './accessible';

export const RoleHasPermissions = (roleInstance: ROLES): [] | string[] => {
  switch (roleInstance) {
    case ROLES.ADMIN:
      return [AccessibleSystem.ACCCESS_ADMIN];
    case ROLES.USER:
      return [];
    default:
      return [];
  }
};
