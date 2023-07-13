import {Controller, HttpCode, HttpStatus, Injectable, Post, UploadedFile} from "@nestjs/common";
import {ApiFile, IFile} from "../../decorators/file.decorator";
import {QuestionService} from "./question.service";
const fs = require('fs');
@Controller("questions")
export class QuestionController {

    constructor(
    private readonly questionService: QuestionService
    ) {}

    @Post("upload")
    // @AuthDecorators([RoleEnum.USER])
    @ApiFile({ name: 'file',
        isArray: false
    }, { isRequired: true })
    @HttpCode(HttpStatus.OK)
    upload(
        @UploadedFile() file: IFile,
    ) {
       return  this.questionService.parseHtml(file);
    }
}