import { Injectable }       from '@angular/core';

import {
    QuestionBase,
    TextboxQuestion  }     from './../../../shared';
import { messageREGEXSLASHW, REGEXSLASHW }     from '../../../app.constants';

import { IAbstractFormQuestionService } from
    '../../abstract/abstract.questions.service';

import { PatientFormQuestionService } from
    '../../patient/patient-form.questions.service';

// TODO should become plain object
@Injectable()
export class PatientFormQuestionProtoComponent implements
        IAbstractFormQuestionService {

    public getQuestions: Array<QuestionBase<string>> =
        new PatientFormQuestionService().getQuestions.concat([

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

        ]);

}
