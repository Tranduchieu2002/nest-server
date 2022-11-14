import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { SignInDto } from '../../dtos/auth/signin.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async findOne(
    findData: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity | null> {
    return this.userRepository
      .createQueryBuilder('users')
      .where(`users.email = :email`, {
        email: findData.email,
      })
      .getOne();
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.findByEmail(email);
      console.log(user);
    } catch (e) {
      throw new HttpException(
        "User or password doesn't match",
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneByOrFail({
      email,
    });
  }

  async createUser(userRegisterDto: SignInDto): Promise<UserEntity> {
    const user = this.userRepository.create(userRegisterDto);

    await this.userRepository.save(user);

    return user;
  }
}
