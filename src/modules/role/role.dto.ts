import { IsString } from "class-validator";
import { AbstractTranslationDto } from "../base/base.dto";
import { RoleEntity } from "./role.entity";

export class RoleDto extends AbstractTranslationDto {
  @IsString()
  name: string;
  constructor(roleE: RoleEntity) {
    super(roleE);
    this.name = roleE.name;
  }
}