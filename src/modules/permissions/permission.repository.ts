import { dataSource } from '../../data-source/postgresql.datasouce';
import { PermissionsEntity } from './permission.entity';

export const UserRepository = dataSource
  .getRepository(PermissionsEntity)
  .extend({});
