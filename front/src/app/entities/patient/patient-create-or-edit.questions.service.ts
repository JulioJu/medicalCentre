import { Injectable }       from '@angular/core';

import {
    DropdownQuestion,
    QuestionBase,
    TextboxQuestion  }     from './../../shared';
import { idSSNReg,
    REGEXADDRESS, messageREGEXADDRESS,
    birthdateMinDate, birthdateMaxDate
}     from '../../shared/validator';

import { IAbstractCreateOrEditQuestionsService } from
    '../abstract/abstract-create-or-edit.questions.service';

import { PersonFormQuestionService } from
    '../person/person-create-or-edit.questions.service';

// TODO should become plain object
@Injectable()
export class PatientCreateOrEditQuestionsService
    implements IAbstractCreateOrEditQuestionsService {

    public getQuestions: Array<QuestionBase<string>> =

        PersonFormQuestionService.getQuestions.concat([

            new TextboxQuestion({
                key: '_idSSN',
                label: 'Social security number',
                required: true,
                placeholder: '15 digits',
                title: 'should match 15 digits',
                pattern: idSSNReg,
                patternMessage: 'french social security number (15 digits)'
            }),

            new TextboxQuestion({
                key: '_birthday',
                label: 'Birthday',
                required: true,
                type: 'date',
                placeholder: 'dd / mm / yyyy',
                min: birthdateMinDate,
                max: birthdateMaxDate
            }),

            new DropdownQuestion({
                key: '_gender',
                label: 'Gender',
                required: true,
                options: [
                    {key: 'male',  value: 'Male'},
                    {key: 'woman',  value: 'Woman'},
                    {key: 'other',  value: 'Other'}
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
                min: -90,
                max: 90
            }),

            new TextboxQuestion({
                key: '_latitude',
                label: 'Latitude',
                required: true,
                placeholder: '5.734501',
                type: 'number',
                min: -90,
                max: 90
            })
        ]);

}
