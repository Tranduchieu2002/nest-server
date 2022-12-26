import { RoleEnum } from "@/constants";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { StatusEnum } from "../base/base.entity";
import { BaseService } from "../base/base.service";
import { PermissionsEntity } from "../permissions/permission.entity";
import { RoleDto, RoleEntity } from "./role.entity";

@Injectable()
export class RoleService extends BaseService<RoleEntity, {}> {
  constructor(
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly permissionRepository: Repository<PermissionsEntity>){
      super(roleRepository)
  }

  async createRoleWithPermissions(role: RoleEnum, permissions: string[], status: StatusEnum = StatusEnum.Active) : Promise<RoleEntity>{
    let roleUser = this.roleRepository.create({ name: role, status })
    let rolePermissions : PermissionsEntity[] = []
    for (const permission of permissions) {
      const permisisonAfterSave = this.permissionRepository.create({
        name: permission,
      });
      rolePermissions.push(permisisonAfterSave);
    }
    rolePermissions = await this.permissionRepository.save(rolePermissions);
    roleUser.permissions = rolePermissions;
    roleUser = await this.roleRepository.save(roleUser)
    return roleUser
  }
}