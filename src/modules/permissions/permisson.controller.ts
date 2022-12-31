import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthDecorators } from '../../decorators/combine-decorators';
import { UserDto } from '../../modules/user/dtos/user.dto';
import { PermissionsSevice } from './permisson.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionSevice: PermissionsSevice) {}

  @AuthDecorators()
  @Get('')
  @HttpCode(HttpStatus.OK)
  getPermissions(@AuthUser() user: UserDto) {
    return this.permissionSevice.generatePermissions(user);
  }
}
