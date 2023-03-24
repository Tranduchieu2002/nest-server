import { plainToInstance } from 'class-transformer';
import { BaseDto } from '../base/base.dto';
import { PhotoEntity } from './photo.entity';

export class PhotoDto extends BaseDto {
  url: string;

  original_filename: string;

  width: number;

  height: number;

  public_id: string;

  format: string;

  asset_id: string;

  constructor(photoEntity: PhotoEntity) {
    super(photoEntity);
    this.url = photoEntity.url;
    this.id = photoEntity.id;
    this.width = photoEntity.width;
    this.height = photoEntity.height;
    this.format = photoEntity.format;
    this.public_id = photoEntity.public_id;
    this.original_filename = photoEntity.original_filename;
  }
  static plainToClass<T>(instance: new (...args: any[]) => T, object: T): T {
    return plainToInstance(instance, object, {
      exposeUnsetFields: true,
      excludeExtraneousValues: true,
    });
  }
}
