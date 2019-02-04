import { Injectable }       from '@angular/core';

import {
    DropdownQuestion,
    QuestionBase,
    TextboxQuestion  }     from './../../shared';
import { REGEXADDRESS, messageREGEXADDRESS }     from '../../app.constants';

import { IAbstractCreateOrEditQuestionsService } from
    '../abstract/abstract-create-or-edit.questions.service';

import { PersonFormQuestionService } from
    '../person/person-create-or-edit.questions.service';

// TODO should become plain object
@Injectable()
export class PatientCreateOrEditQuestionsService
    implements IAbstractCreateOrEditQuestionsService {

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
            }),

            new TextboxQuestion({
                key: '_address',
                label: 'Address',
                required: true,
                placeholder: '1 place de la République 75011 Paris',
                minLength: 3,
                maxLength: 180,
                title: messageREGEXADDRESS,
                pattern: REGEXADDRESS,
                patternMessage: messageREGEXADDRESS
            }),

            new TextboxQuestion({
                key: '_longitude',
                label: 'Longitude',
                required: true,
                placeholder: '45.190725',
                type: 'number',
                min: 0,
                max: 90
            }),

            new TextboxQuestion({
                key: '_latitude',
                label: 'Latitude',
                required: true,
                placeholder: '5.734501',
                type: 'number',
                min: 0,
                max: 90
            })
        ]);

}
