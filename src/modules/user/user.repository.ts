import { dataSource } from '../../data-source/postgresql.datasouce';
import { UserEntity } from './user.entity';

export const UserRepository = dataSource.getRepository(UserEntity).extend({});
