import { Constructor } from 'modules/user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseDto } from './base.dto';

declare global {
  export type Uuid = string & { _uuidBrand: undefined };
}
export interface IAbstractEntity<DTO extends BaseDto, O = never> {
  id: Uuid;
  createdAt: Date;
  updatedAt: Date;

  toDto(options?: O): DTO;
}
export abstract class BaseEntity<Dto extends BaseDto = BaseDto, O = never>
  implements IAbstractEntity<Dto, O>
{
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @CreateDateColumn({
    type: 'timestamp',
    default: new Date(),
  })
  createdAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    default: null,
  })
  deletedAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: null,
  })
  updatedAt: Date;

  @Column({
    type: 'boolean',
    default: true,
  })
  isPublished: boolean;

  private dtoClass?: Constructor<Dto, [BaseEntity, O?]>;

  toDto(options?: O): Dto {
    const dtoClass = this.dtoClass;
    if (!dtoClass) {
      throw new Error('should use decorator use dto');
    }
    return new dtoClass(this, options);
  }
}

export interface IBaseEntity<DTO extends BaseDto, O = never> {
  id: Uuid;
  createdAt: Date;
  updatedAt: Date;
  deleteAt?: Date;
}
