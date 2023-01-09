import { plainToInstance } from 'class-transformer';
import { BaseEntity, StatusEnum } from './base.entity';

interface BaseDtoOptions {
  excludeFields: boolean;
}

export class BaseDto {
  id: Uuid;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  status: StatusEnum;
  constructor(entity: BaseEntity, options?: BaseDtoOptions) {
    if (!options?.excludeFields) {
      this.id = entity?.id;

      this.createdAt = entity.createdAt;

      this.updatedAt = entity.updatedAt;

      this.status = entity.status;
    }
  }

}

export class AbstractTranslationDto extends BaseDto {
  constructor(entity: BaseEntity) {
    super(entity, { excludeFields: true });
  }
}
