import { Repository } from 'typeorm';
import { PermissionsEntity } from '../modules/permissions/permission.entity';
import { AccessibleSystem } from './accessible';

export enum PermissionAction {
  ANY = '*',
  CREATE = 'CREATE',
  REMOVE = 'REMOVE',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  VIEW = 'VIEW',
  VIEW_ALL = 'VIEWALL',
}

const UserPermissions = {
  name: 'USER',
  permissions: {
    REMOVE: 'REMOVE_USER',
    UPDATE: 'UPDATE_USER',
    VIEW: 'VIEW_USER',
    DELETE: 'DELETE_USER',
    VIEW_ALL: 'VIEW_ALL_USER',
  },
};
export const generateUserPermissions = (
  permissionRepository: Repository<PermissionsEntity>,
): PermissionsEntity[] => [
  generateViewPermissions('user', permissionRepository),
  generateViewPermissions('article', permissionRepository),
  generateUpdatePermission('article', permissionRepository),
  generateRemovePermission('article', permissionRepository),
];

export const generateAnyPermissions = (
  modelName: string,
  permissionRepository: Repository<PermissionsEntity>,
): PermissionsEntity => {
  return permissionRepository.create({
    name: `${PermissionAction.ANY}_${modelName.toUpperCase()}`,
    model: modelName.toUpperCase(),
  });
};

export const generateViewPermissions = (name: string, permissionRepository) => {
  return permissionRepository.create({
    name: `${PermissionAction.VIEW}_${name.toUpperCase()}`,
    model: name.toUpperCase(),
  });
};
export const generateUpdatePermission = (
  modelName: string,
  permissionRepository: Repository<PermissionsEntity>,
) =>
  permissionRepository.create({
    name: `${PermissionAction.UPDATE}_${modelName.toUpperCase()}`,
    model: modelName.toUpperCase(),
  });
export const generateDeletePermission = (
  modelName: string,
  permissionRepository: Repository<PermissionsEntity>,
) =>
  permissionRepository.create({
    name: `${PermissionAction.DELETE}_${modelName.toUpperCase()}`,
    model: modelName.toUpperCase(),
  });
export const generateRemovePermission = (
  modelName: string,
  permissionRepository: Repository<PermissionsEntity>,
) =>
  permissionRepository.create({
    name: `${PermissionAction.REMOVE}_${modelName.toUpperCase()}`,
    model: modelName.toUpperCase(),
  });
export const generateCreatePermission = (
  modelName: string,
  permissionRepository: Repository<PermissionsEntity>,
) =>
  permissionRepository.create({
    name: `${PermissionAction.CREATE}_${modelName.toUpperCase()}`,
    model: modelName.toUpperCase(),
  });
export const generateAdminPermissions = (
  permissionRepository: Repository<PermissionsEntity>,
) => {
  return [
    AccessibleSystem.ACCCESS_ADMIN,
    generateAnyPermissions('user', permissionRepository),
    generateAnyPermissions('article', permissionRepository),
  ];
};
const ArticlesPermissions = {
  name: 'ARTICLE',
  permissions: {
    REMOVE: 'REMOVE_ARTICLE',
    UPDATE: 'UPDATE_ARTICLE',
    VIEW: 'VIEW_ARTICLE',
    VIEW_ALL: 'VIEW_ALL_ARTICLES',
  },
};
