import { userDto } from './dto/user.dto';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { user } from './interfaces/user.interface';
  /**
   * Creates a signed jwt token based on IProfile payload
   * @param {Profile} param dto to generate token from
   * @returns {Promise<ITokenReturnBody>} token body
   */
@Injectable()
export class UsersService {
  users: userDto[] = [];
  createNewUser(_id: string, name: string) {
    console.log(_id)
    const newUser: userDto = new userDto(_id, name, new Date());
    this.users.push(newUser);
  }
  getAll() {
    return this.users;
  }
}
