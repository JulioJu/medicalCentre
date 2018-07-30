import { Injectable }       from '@angular/core';

import {
    DropdownQuestion,
    QuestionBase,
    TextboxQuestion  }     from './../../shared';

import { IAbstractFormQuestionService } from
    '../abstract/abstract.questions.service';

import { PersonFormQuestionService } from
    '../person/person-form.question.service';

@Injectable()
export class PatientFormQuestionService extends PersonFormQuestionService
    implements IAbstractFormQuestionService {

    // TODO: get from a remote source of question metadata
    // TODO: make asynchronous
    getQuestions(): QuestionBase<any>[] {

        const questions: QuestionBase<any>[] = [

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

        return super.getQuestions()
            .concat(questions);
    }

}
