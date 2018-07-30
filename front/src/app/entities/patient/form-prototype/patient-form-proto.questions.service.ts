import { Injectable }       from '@angular/core';

import {
    DropdownQuestion,
    QuestionBase,
    TextboxQuestion  }     from './../../../shared';
import { messageREGEXSLASHW, REGEXSLASHW,
    REGEXFRENCH, messageREGEXFRENCH }     from '../../../app.constants';

@Injectable()
export class PatientFormQuestionProtoComponent {

    // TODO: get from a remote source of question metadata
    // TODO: make asynchronous
    getQuestions(): QuestionBase<any>[] {

        const questions: QuestionBase<any>[] = [

            new TextboxQuestion({
                key: 'id',
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
                key: 'firstname',
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
                key: 'lastname',
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
                key: 'address',
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
                key: 'idSSN',
                label: 'Social security number',
                required: true,
                placeholder: '15 digits',
                title: 'should match 15 digits',
                pattern: /^[\d]{15}$/,
                patternMessage: 'french social security number (15 digits)'
            }),

            new DropdownQuestion({
                key: 'isMale',
                label: 'Sex',
                required: true,
                options: [
                    {key: 'male',  value: 'Male'},
                    {key: 'woman',  value: 'Woman'}
                ]
            }),

            new TextboxQuestion({
                key: 'birthday',
                label: 'Birthday',
                required: true,
                type: 'date',
                placeholder: 'dd / mm / yyyy',
                min: new Date(new Date('1900-01-01')),
                max: new Date(Date.now() - 864e5)
            }),

            new TextboxQuestion({
                key: 'numbertest',
                label: 'Number: just for test',
                required: false,
                placeholder: 'Between 1 and 3',
                type: 'number',
                min: 1,
                max: 3
            }),

            new TextboxQuestion({
                key: 'emailtest',
                label: 'Email: just for tests',
                required: false,
                placeholder: 'email',
                type: 'email'
            }),

            new TextboxQuestion({
                key: 'testPattern',
                label: 'Pattern: just for tests',
                required: false,
                placeholder: '/^\w+$/',
                readonly: false,
                minLength: 2,
                maxLength: 24,
                title: messageREGEXSLASHW,
                pattern: REGEXSLASHW,
                patternMessage: messageREGEXSLASHW
            })

        ];

        return questions;
    }

}
