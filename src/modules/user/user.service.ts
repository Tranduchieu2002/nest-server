import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { SignInDto } from '../../dtos/auth/signin.dto';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';

interface User {
  id: string;
  email: string;
  password: string;
}
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  findOne(findData: FindOptionsWhere<UserEntity>): UserDto | null {
    return null;
  }
  async createUser(userRegisterDto: SignInDto): Promise<UserEntity> {
    const user = this.userRepository.create(userRegisterDto);

    await this.userRepository.save(user);

    return user;
  }
}
