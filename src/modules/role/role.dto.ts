import { IsString } from "class-validator";
import { BaseDto } from "../base/base.dto";
import { RoleEntity } from "./role.entity";

export class RoleDto extends BaseDto {
  @IsString()
  name: string;
  constructor(roleE: RoleEntity) {
    super(roleE);
    this.name = roleE.name;
  }
}