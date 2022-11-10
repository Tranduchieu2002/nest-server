import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseDto } from './base.dto';

declare global {
  export type Uuid = string & { _uuidBrand: undefined };
}
export interface IAbstractEntity<DTO extends BaseDto, O = never> {
  id: Uuid;
  createdAt: Date;
  updatedAt: Date;

  // toDto(options?: O): DTO;
}
@Entity()
export abstract class BaseEntity<Dto extends BaseDto = BaseDto, O = never>
  implements IAbstractEntity<Dto, O>
{
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column('text')
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  deletedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @Column()
  isPublished: boolean;
  constructor(baseDto: BaseDto) {
    this.id = baseDto.id;
    this.createdAt = baseDto.createdAt;
  }
}

export interface IBaseEntity<DTO extends BaseDto, O = never> {
  id: Uuid;
  createdAt: Date;
  updatedAt: Date;
  deleteAt?: Date;
}
