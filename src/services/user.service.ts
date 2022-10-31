import { Injectable } from '@nestjs/common';

interface IUser {
  name: string;
  id: string;
}

@Injectable()
export class UserService {
  private readonly user: IUser = {
    name: '',
    id: '2',
  };

  updateUser(id: string, name: string) {
    this.user.name = name;
    this.user.id = id;
    console.log(this.user);
  }
}
