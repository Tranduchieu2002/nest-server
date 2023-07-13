import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import {QuestionEntity} from "./question.entity";
import { IFile } from "../../decorators/file.decorator";
const mammoth = require('mammoth');
import {Node, parse} from 'node-html-parser';

@Injectable()
export class QuestionService extends BaseService<QuestionEntity, any> {
    constructor(
        @InjectRepository(QuestionEntity)
        private readonly photoRepository: Repository<QuestionEntity>,
    ) {
        super(photoRepository);
    }
    async readDocxFile(file: IFile) {
        try {
            const options = {
                styleMap: [
                    "strike => del",
                    "p[style-name='Ordered List 1 Continuation'] => ol > li > p:fresh\n",
                    "table[style-name='Table Grid'] => table.table-grid",
                    "tr[style-name='Table Grid'] => tr.table-grid",
                    "td[style-name='Table Grid'] => td.table-grid",

                ]
            };
            const result = await mammoth.convertToHtml({ buffer: file.buffer }, options);
            const htmlContent = result.value;

            this.parseHtml(htmlContent)

            return  htmlContent
        } catch (error) {
            console.error('Error reading .docx file:', error);
        }
    }

    parseHtml(html) {
        const root  = parse(html.buffer);
        let questions : { question: string, ans : string, score: string}[] = [];
        const tableElement = root.querySelector('table');

        for (const rowElement of tableElement?.childNodes ?? []) {
            const question = rowElement.childNodes[0].toString();
            const ans = rowElement.childNodes[1].toString();
            const score = rowElement.childNodes[2].text;
            questions.push({ question, ans, score})
        }
        root.childNodes = [];
        // @ts-ignore
        for(const a of questions) {
            root.childNodes.push(parse(a.question));
            root.childNodes.push(parse(a.ans))
        }
        return root.toString()

    }
    async updatePhoto(data: object): Promise<QuestionEntity> {
        const photo = this.photoRepository.create(data);
        return this.photoRepository.save(photo);
    }
}
