import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Auth } from '../../modules/auth/auth.decorator';
import { PermissionsSevice } from './permisson.service';

@Controller('permissons')
export class PermissionsController {
  constructor(private readonly permissionSevice: PermissionsSevice) {}

  @Auth()
  @Get('')
  @HttpCode(HttpStatus.OK)
  getPermissions() {
    return this.permissionSevice.generatePermissions();
  }
}
