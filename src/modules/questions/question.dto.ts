import {BaseDto} from "../base/base.dto";
import {plainToInstance} from "class-transformer";
import {ProblemEntity} from "@/modules/problems/problems.entity";

export class QuestionDto extends BaseDto {

    constructor(problemEntity: ProblemEntity) {
        super(problemEntity);
    }
    static plainToClass<T>(instance: new (...args: any[]) => T, object: T): T {
        return plainToInstance(instance, object, {
            exposeUnsetFields: true,
            excludeExtraneousValues: true,
        });
    }
};