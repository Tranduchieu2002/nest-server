import { dataSource } from '../../data-source/postgresql.datasouce';
import { PermissionsEntity } from './permission.entity';

export const PermissionRepository = dataSource
  .getRepository(PermissionsEntity)
  .extend({});
