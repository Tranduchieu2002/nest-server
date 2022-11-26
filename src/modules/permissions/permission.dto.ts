import { BaseDto } from '../../modules/base/base.dto';
import { PermissionsEntity } from './permission.entity';

interface IPermissionsDto {
  name: string;
}

export class PermissionsDto extends BaseDto implements IPermissionsDto {
  name: string;
  constructor(permissionE: PermissionsEntity) {
    super(permissionE);
    this.name = permissionE.name;
  }
}
