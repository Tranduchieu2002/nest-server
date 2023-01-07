import { RoleEnum } from "@server/constants";
import { AuthDecorators } from "../../decorators/combine-decorators";
import { CallHandler, ExecutionContext, Get, HttpCode, HttpStatus, mixin, NestInterceptor, Query } from "@nestjs/common";
import { BaseDto } from "./base.dto";
import { BaseEntity } from "./base.entity";
import { BaseService } from "./base.service";
import { PageOptionsDto } from "./paginate";
import { Observable } from "rxjs";
import { Repository } from "typeorm";
 
type OptionsMixinController = {
  name?: string
}

export function BaseMixinController(options: OptionsMixinController) {
  class BaseController <Entity extends BaseEntity<dto>, dto extends BaseDto>  {

    constructor(
      private readonly baseService: BaseService<Entity, dto>, 
      private readonly baseRepository: Repository<Entity>
    ) { }
  
    @Get('aduma')
    @AuthDecorators([RoleEnum.ADMIN])
    @HttpCode(HttpStatus.OK)
    getUsers(@Query() pageOptions: PageOptionsDto) {
  
      console.log("getUsers:  ")
      return this.baseService.getMany(pageOptions);
    }  
  }
  return mixin(BaseController)
} 