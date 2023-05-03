import { UseDto } from "../../decorators";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity, IAbstractEntity, IBaseEntity } from "../base/base.entity";
import { UserEntity } from "../user/user.entity";
import { ProblemDto } from "./problems.dto";

export interface IProlemEntity extends IBaseEntity<ProblemEntity> {
  description: JSON;
  title: string;
}

interface PhotoDtoOptions {

}


@Entity({
  name: "problems",
  synchronize: true,
})
export class ProblemEntity extends BaseEntity<ProblemDto , PhotoDtoOptions> implements IProlemEntity {

  @Column({ type: "char" })
  title: string;

  @Column({ type: "json" })
  description: JSON;
  
}