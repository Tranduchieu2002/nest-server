import { IsString } from "class-validator";
import { AbstractTranslationDto } from "../base/base.dto";
import { PermissionsDto } from "../permissions/permission.dto";
import { RoleEntity } from "./role.entity";

export type RoleDtoOptions = Partial<{ isActive: boolean , isHasPermissions: boolean}>;

export class RoleDto extends AbstractTranslationDto {
  @IsString()
  name: string;

  permissions: PermissionsDto[]
  constructor(roleE: RoleEntity, options?: RoleDtoOptions) {
    super(roleE);
    this.name = roleE.name;
    if(options?.isHasPermissions) {
      this.permissions = roleE.permissions.map(p => p.toDto())
    }
  }
  
}