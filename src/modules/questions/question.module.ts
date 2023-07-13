import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {QuestionController} from "./question.controller";
import { QuestionEntity } from "./question.entity";
import {QuestionService} from "./question.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([QuestionEntity]),
    ],
    providers: [QuestionService],
    exports: [],
    controllers: [QuestionController]
})
export class QuestionModule {}
