import { Injectable }       from '@angular/core';

import {
    DropdownQuestion,
    QuestionBase,
    TextboxQuestion  }     from './../../shared';

@Injectable()
export class PatientFormQuestionComponent {

    // Todo: get from a remote source of question metadata
    // Todo: make asynchronous
    getQuestions(): QuestionBase<any>[] {

        const questions: QuestionBase<any>[] = [

            new TextboxQuestion({
                key: 'id',
                label: 'Identifier',
                required: true
            }),

            new TextboxQuestion({
                key: 'firstname',
                label: 'Firstname',
                required: true
            }),

            new TextboxQuestion({
                key: 'lastname',
                label: 'Lastname',
                required: true
            }),

            new TextboxQuestion({
                key: 'address',
                label: 'Address',
                required: true
            }),

            new TextboxQuestion({
                key: 'idSSN',
                label: 'Social security number',
                required: true
            }),

            new DropdownQuestion({
                key: 'isMale',
                label: 'Sex',
                options: [
                    {key: 'male',  value: 'Male'},
                    {key: 'woman',  value: 'Woman'}
                ],
                required: true
            }),

            new TextboxQuestion({
                key: 'birthday',
                label: 'Birthday',
                type: 'date',
                required: true
            })

        ];

        return questions;
    }

}
