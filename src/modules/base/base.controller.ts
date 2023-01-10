import { RoleEnum } from "@server/constants";
import { AuthDecorators } from "../../decorators/combine-decorators";
import { Body, Delete, Get, HttpCode, HttpStatus, Injectable, mixin,  Param, Patch, Put, Query } from "@nestjs/common";
import { BaseDto } from "./base.dto";
import { BaseEntity } from "./base.entity";
import { BaseService } from "./base.service";
import { PageOptionsDto } from "./paginate";
import { Repository } from "typeorm";
 
type OptionsMixinController = {
  name?: string,
  rolesAccess?: RoleEnum[]
}

export function BaseMixinController<Entity extends BaseEntity<dto>, dto extends BaseDto> (options: OptionsMixinController) {
  const { rolesAccess= [] } = options
  class BaseController {
    constructor(
      private readonly baseService: BaseService<Entity, dto>, 
      private readonly baseRepository: Repository<Entity>
    ) { }
  
    @Get()
    @AuthDecorators([RoleEnum.ADMIN, ...rolesAccess])
    @HttpCode(HttpStatus.OK)
    async getUsers1(@Query() pageOptions: PageOptionsDto) {
      return this.baseService.getMany(pageOptions); 
    }

    @Delete(':id')
    @AuthDecorators([RoleEnum.ADMIN, ...rolesAccess])
    @HttpCode(HttpStatus.OK)
    deleteUser(@Param('id') id: string) {
      return this.baseService.softDelete(id as Uuid);
    }

    @Patch(':id')
    @AuthDecorators()
    @HttpCode(HttpStatus.OK)
    updateUser(@Param('id') id: string, @Body() body: {}) {
      return this.baseRepository.update(id, body)
    }
  }
  return mixin(BaseController)
} 