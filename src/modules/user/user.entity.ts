import { Column } from "typeorm";
import { BaseEntity } from "./base.entity";

export class UserEntity extends BaseEntity {
  @Column('string')
  email: string

  @Column('string')
  password: string
}