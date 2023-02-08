import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("application_configs")
export class ApplicationConfigsEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: Uuid;

  @CreateDateColumn({
    type: 'timestamp',
    default: new Date(),
  })
  createdAt: Date;

  @Column({ type: "boolean" })
  isInitialized: boolean;
}