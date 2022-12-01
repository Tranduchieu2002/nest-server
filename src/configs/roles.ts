import { Repository } from 'typeorm';
import { RoleEnum, ROLES } from '../constants/roles';
import { PermissionsEntity } from '../modules/permissions/permission.entity';
import {
  generateAdminPermissions,
  generateUserPermissions,
} from './permissions';

export const RoleHasPermissions = (
  roleInstance: RoleEnum,
  permissionRepository: Repository<PermissionsEntity>,
): [] | PermissionsEntity[] => {
  switch (roleInstance) {
    case ROLES.ADMIN:
      return generateAdminPermissions(permissionRepository);
    case ROLES.USER:
      return generateUserPermissions(permissionRepository);
    default:
      return [];
  }
};
