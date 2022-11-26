import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionsEntity } from './permission.entity';

@Injectable()
export class PermissionsSevice {
  constructor(
    @InjectRepository(PermissionsEntity)
    private permissionsEntity: PermissionsEntity,
  ) {}
  generatePermissions() {}
}
