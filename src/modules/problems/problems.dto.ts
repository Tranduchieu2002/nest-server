import { plainToInstance } from 'class-transformer';
import { BaseDto } from '../base/base.dto';
import { ProblemEntity } from './problems.entity';

export class ProblemDto extends BaseDto {

  title: string;

  description: JSON;

  constructor(problemEntity: ProblemEntity) {
    super(problemEntity);
    this.description = problemEntity.description;
    this.title = problemEntity.title;
  }
  static plainToClass<T>(instance: new (...args: any[]) => T, object: T): T {
    return plainToInstance(instance, object, {
      exposeUnsetFields: true,
      excludeExtraneousValues: true,
    });
  }
}
