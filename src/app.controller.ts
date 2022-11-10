import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { AppConfigService } from './shared/services/app-configs.service';

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
}
