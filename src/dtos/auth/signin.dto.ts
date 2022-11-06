import { Expose, plainToInstance, Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsString()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  @Transform(({ value }) => value.toString())
  password: string;
  static plainToClass<T>(instance: new (...args: any[]) => T, object: T): T {
    return plainToInstance(instance, object, {
      exposeUnsetFields: true,
      excludeExtraneousValues: true,
    });
  }

  remember: boolean;
}
