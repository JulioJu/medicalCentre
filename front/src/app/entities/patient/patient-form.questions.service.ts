import { Injectable }       from '@angular/core';

import {
    DropdownQuestion,
    QuestionBase,
    TextboxQuestion  }     from './../../shared';

import { IAbstractFormQuestionService } from
    '../abstract/abstract.questions.service';

import { PersonFormQuestionService } from
    '../person/person-form.question.service';

// TODO should become plain object
@Injectable()
export class PatientFormQuestionService
    implements IAbstractFormQuestionService {

    private readonly oneDay: number = 864e5;

    public getQuestions: Array<QuestionBase<string>> =

        PersonFormQuestionService.getQuestions.concat([

            new TextboxQuestion({
                key: '_idSSN',
                label: 'Social security number',
                required: true,
                placeholder: '15 digits',
                title: 'should match 15 digits',
                pattern: /^[\d]{15}$/,
                patternMessage: 'french social security number (15 digits)'
            }),

            new TextboxQuestion({
                key: '_birthday',
                label: 'Birthday',
                required: true,
                type: 'date',
                placeholder: 'dd / mm / yyyy',
                min: new Date(new Date('1900-01-01')),
                // TODO why 864e5
                max: new Date(Date.now() - this.oneDay)
            }),

            new DropdownQuestion({
                key: '_isMale',
                label: 'Sex',
                required: true,
                options: [
                    {key: 'male',  value: 'Male'},
                    {key: 'woman',  value: 'Woman'}
                ]
            })

        ]);

}
