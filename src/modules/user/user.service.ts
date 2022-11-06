import { Inject, Injectable } from '@nestjs/common';

interface User {
  id: string;
  email: string;
  password: string;
}
@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: '1',
      email: 'cuhieu04112002@gmail.com',
      password: '1234',
    },
  ];
  constructor(
    @Inject('USER_CONFIGS')
    private readonly userConfigs,
  ) {}
  async findOne(
    needValiteValue: Omit<User, 'id'>,
  ): Promise<{ id: string; email: string } | undefined> {
    return this.users.find((user: User) => needValiteValue.email == user.email);
  }
  save(data) {
    console.log(this.userConfigs, data);
  }
}
