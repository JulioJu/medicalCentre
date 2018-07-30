import { Injectable }       from '@angular/core';

import {
    DropdownQuestion,
    QuestionBase,
    TextboxQuestion  }     from './../../shared';
import { messageREGEXSLASHW, REGEXSLASHW,
    REGEXFRENCH, messageREGEXFRENCH }     from '../../app.constants';

import { IAbstractFormQuestionService } from
    '../abstract/abstract.questions.service';

@Injectable()
export class PatientFormQuestionService implements
        IAbstractFormQuestionService {

    // TODO: get from a remote source of question metadata
    // TODO: make asynchronous
    getQuestions(): QuestionBase<any>[] {

        const questions: QuestionBase<any>[] = [

            new TextboxQuestion({
                key: '_id',
                label: 'Identifier',
                required: false,
                placeholder: 'Better if lets empty (automatically generated)',
                minLength: 2,
                maxLength: 24,
                readonly: true,
                title: messageREGEXSLASHW,
                pattern: REGEXSLASHW,
                patternMessage: messageREGEXSLASHW
            }),

            new TextboxQuestion({
                key: '_firstname',
                label: 'Firstname',
                required: true,
                autofocus: true,
                placeholder: 'Jean',
                minLength: 2,
                maxLength: 80,
                title: messageREGEXFRENCH,
                pattern: REGEXFRENCH,
                patternMessage: messageREGEXFRENCH
            }),

            new TextboxQuestion({
                key: '_lastname',
                label: 'Lastname',
                required: true,
                placeholder: 'Dupont',
                minLength: 2,
                maxLength: 80,
                title: messageREGEXFRENCH,
                pattern: REGEXFRENCH,
                patternMessage: messageREGEXFRENCH
            }),

            new TextboxQuestion({
                key: '_address',
                label: 'Address',
                required: true,
                placeholder: '1 place de la République 75011 Paris',
                minLength: 3,
                maxLength: 180,
                title: messageREGEXFRENCH,
                pattern: REGEXFRENCH,
                patternMessage: messageREGEXFRENCH
            }),

            new TextboxQuestion({
                key: '_idSSN',
                label: 'Social security number',
                required: true,
                placeholder: '15 digits',
                title: 'should match 15 digits',
                pattern: /^[\d]{15}$/,
                patternMessage: 'french social security number (15 digits)'
            }),

            new DropdownQuestion({
                key: '_isMale',
                label: 'Sex',
                required: true,
                options: [
                    {key: 'male',  value: 'Male'},
                    {key: 'woman',  value: 'Woman'}
                ]
            }),

            new TextboxQuestion({
                key: '_birthday',
                label: 'Birthday',
                required: true,
                type: 'date',
                placeholder: 'dd / mm / yyyy',
                min: new Date(new Date('1900-01-01')),
                max: new Date(Date.now() - 864e5)
            })

        ];

        return questions;
    }

}
