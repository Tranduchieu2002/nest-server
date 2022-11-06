import { Body, Delete, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { userDto } from './dto/user.dto';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('create')
  createUser(@Body("_id") _id: string, @Body("name") name: string) {
    console.log(_id,name)
    this.usersService.createNewUser(_id, name);
    return "ok"
  }
  @Get()
  getUsers(@Res() res: Response) {
    const a = this.usersService.getAll()
    res.status(HttpStatus.OK).send(a)
  }
  @Delete("") 
  deleteAll() {
    this.usersService.users = []
    return this.usersService.users
  }
}
