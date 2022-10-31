import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AppConfigService } from 'shared/services/app-configs.service';
import { AppService } from './app.service';
import { CatDtoClass } from './dtos/cat.dto';

interface CatDto {
  name: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: AppConfigService,
  ) {}

  @Get()
  @HttpCode(200)
  getHello(@Res() response: Response) {
    const message = this.appService.getHello();
    response.json({ message: this.configService.authConfig });
  }

  @Put('cat/:id')
  @HttpCode(201)
  updateCat(
    @Param('id')
    id: string,
    @Body()
    body: CatDtoClass,
  ) {
    const valueAfterValidate = CatDtoClass.plainToClass(CatDtoClass, body);

    console.log(valueAfterValidate);
    // this.userService.updateUser(id, body.name);
    return {
      message: `id: ${id} with name la con me no ${body.name}`,
    };
  }
}
