import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('permissons')
export class PermissionsController {
  constructor() {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  getPermissions() {}
}
