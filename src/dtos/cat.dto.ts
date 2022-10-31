import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { BaseDto } from './base.dto';

export class CatDtoClass extends BaseDto {
  @IsNumber()
  id: string;

  @IsString()
  @Expose()
  name: string;
}
