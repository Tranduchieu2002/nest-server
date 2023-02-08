import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationConfigsEntity } from "./application.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationConfigsEntity]),
  ],
})
export class ApplicationConfigurationsModule {
  
}