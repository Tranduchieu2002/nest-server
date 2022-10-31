import { Expose, plainToInstance } from 'class-transformer';

export abstract class BaseDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
  @Expose()
  deletedAt: Date;

  static plainToClass<T>(instance: new (...args: any[]) => T, object: T): T {
    return plainToInstance(instance, object, {
      exposeUnsetFields: true,
      excludeExtraneousValues: true,
    });
  }
}
