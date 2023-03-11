import { Order, RoleEnum } from "@server/constants";
import { AuthDecorators } from "../../decorators/combine-decorators";
import { Body, Delete, Get, HttpCode, HttpStatus, Injectable, mixin, Param, Patch, Put, Query } from "@nestjs/common";
import { BaseDto } from "./base.dto";
import { BaseEntity } from "./base.entity";
import { BaseService } from "./base.service";
import { PageOptionsDto, Pagination } from "./paginate";
import { Repository, SelectQueryBuilder } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export type OptionsMixinController = {
  name?: string,
  rolesAccess?: RoleEnum[]
  defaultSearchByFields?: string[];
  sort?: Order;
}

export function BaseMixinController<Entity extends BaseEntity<dto>, dto extends BaseDto>(options: OptionsMixinController) {
  const { rolesAccess = [],
    defaultSearchByFields = ["createdAT"],
    name,
    sort,
  } = options
  class BaseController {
    public queryBuilder: SelectQueryBuilder<Entity>
    constructor(
      private readonly baseService: BaseService<Entity, dto>,
      private readonly baseRepository: Repository<Entity>
    ) { 
      if (baseRepository) {
        this.createQueryBuilderDefault()
      }
    }

    @Get()
    @AuthDecorators([RoleEnum.ADMIN, ...rolesAccess])
    @HttpCode(HttpStatus.OK)
    async getUsers(@Query() pageOptions: PageOptionsDto): Promise<Pagination<Entity>> {
      const q = [defaultSearchByFields, pageOptions.q]
      const data = this.beforGetAll(await this.baseService.getMany(pageOptions))
      return data;
    }

    @Get(':id')
    @AuthDecorators([RoleEnum.ADMIN, ...rolesAccess])
    @HttpCode(HttpStatus.OK)
    getUserById(@Param('id') id: string) {
      return this.baseService.findOneById(id as Uuid);
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
    async updateUser(@Param('id') id: Uuid, @Body() body: {}) {
      const dataAfterSave = await this.baseService.updateInstanceById(id, body);
      return dataAfterSave.toDto();
    }

    beforGetAll(data: Pagination<Entity>): Pagination<Entity> {
      return data;
    }

    createQueryBuilderDefault() {
      this.queryBuilder = this.baseRepository.createQueryBuilder(name);
      defaultSearchByFields.forEach(searchField => {
        this.queryBuilder.addOrderBy(`${name}.${searchField}`, sort);
      });
    }
  }
  return mixin(BaseController)
} 