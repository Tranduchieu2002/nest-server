import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Head,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import Auth from './auth.model';
@Controller('/auth')
export class AuthController {
  auth: Auth;
  constructor(private readonly authService: AuthService) {}
  @Get()
  findAll(@Req() reques: Request): string {
    return 'Hieu ne';
  }
  @Get('signup')
  signup() {
    return this.authService.signUp();
  }
  @Post()
  create(@Res() res: Response) {
    const a = { name: 'adu' };
    res.status(HttpStatus.OK).json(a);
    return 'This action adds a new cat';
  }
  @Get(":id")
  getOne(@Param("id") id : string){
    
  }
}
