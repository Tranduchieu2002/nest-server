import { UseDto } from "../../decorators";
import { Entity } from "typeorm";
import { BaseEntity, IAbstractEntity, IBaseEntity } from "../base/base.entity";
import { QuestionDto } from "./question.dto";

export interface IQuestionEntity extends IBaseEntity<QuestionEntity> {

}

interface PhotoDtoOptions extends  IAbstractEntity<any>{

}

@Entity({
    name: "problems"
})
@UseDto(QuestionDto)
export class QuestionEntity extends BaseEntity<QuestionDto , PhotoDtoOptions> implements IQuestionEntity {


}