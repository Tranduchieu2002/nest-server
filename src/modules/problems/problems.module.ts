import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemEntity } from './problems.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([ProblemEntity]),
  ],
  providers: [],
  exports: [],
})
export class ProblemsModule {}
