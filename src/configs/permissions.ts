import { AccessibleSystem } from './accessible';

export enum PermissionAction {
  ANY = '*',
  CREATE = 'CREATE',
  REMOVE = 'REMOVE',
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
    VIEW_ALL: 'VIEW_ALL_USER',
  },
};
const generateUserPermissions = (params: PermissionAction) => {
  const permissions = [];
  return [];
};

export const generateViewPermissions = (name: string) => {
  return {
    VIEW: `${PermissionAction.VIEW}_${name.toUpperCase()}`,
  };
  // if (Array.isArray(name)) {
  //   let vPermissions: any = [];
  //   name.forEach((modal) => {
  //     vPermissions.push({
  //       name: modal,
  //       permissions: `${PermissionAction.VIEW}_${modal}`,
  //     });
  //   });
  // }
};
export const generateUpdatePermission = (modelName: string) => ({
  UPDATE: `${PermissionAction.UPDATE}_${modelName.toUpperCase()}`,
});
export const generateRemovePermission = (modelName: string) => ({
  DELETE: `${PermissionAction.REMOVE}_${modelName.toUpperCase()}`,
});
export const generateCreatePermission = (modelName: string) => ({
  CREATE: `${PermissionAction.CREATE}_${modelName.toUpperCase()}`,
});
const generateAdminPermissions = () => {};
const ArticlesPermissions = {
  name: 'ARTICLE',
  permissions: {
    RemoveArticle: 'REMOVE_ARTICLE',
    UpdateArticle: 'UPDATE_ARTICLE',
    Read: 'READ_ARTICLE',
    ViewAll: 'VIEW_ALL_ARTICLES',
  },
};

const allPermisions = [];

export const getAdminPermissions = [AccessibleSystem.ACCCESS_ADMIN];
