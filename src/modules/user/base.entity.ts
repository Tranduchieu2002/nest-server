import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column('date')
  createdAt: Date;

  @Column('date')
  deletedAt: Date;

  @Column()
  isPublished: boolean;
}
