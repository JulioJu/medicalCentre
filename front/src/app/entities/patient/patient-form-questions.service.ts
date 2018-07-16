import { Injectable }       from '@angular/core';

import {
    DropdownQuestion,
    QuestionBase,
    TextboxQuestion  }     from './../../shared';
import { REGEXFRENCH }     from '../../app.constants';

@Injectable()
export class PatientFormQuestionService {

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
                pattern: /^\w+$/,
                patternMessage: 'alphanumeric characters.'
            }),

            new TextboxQuestion({
                key: '_firstname',
                label: 'Firstname',
                required: true,
                placeholder: 'Jean',
                minLength: 2,
                maxLength: 80,
                pattern: REGEXFRENCH,
                patternMessage: 'french characters'
            }),

            new TextboxQuestion({
                key: '_lastname',
                label: 'Lastname',
                required: true,
                placeholder: 'Dupont',
                minLength: 2,
                maxLength: 80,
                pattern: REGEXFRENCH,
                patternMessage: 'french characters'
            }),

            new TextboxQuestion({
                key: '_address',
                label: 'Address',
                required: true,
                placeholder: '1 place de la République 75011 Paris',
                minLength: 3,
                maxLength: 180,
                pattern: /^[ 0-9a-zA-ZçÇéÉàèùÀÈÙâêîôûÂÊÎÔÛüëïüÿËÏÜŸ'-]+$/,
                patternMessage: 'french characters or digits.'
            }),

            new TextboxQuestion({
                key: '_idSSN',
                label: 'Social security number',
                required: true,
                placeholder: '15 digits',
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
