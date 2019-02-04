import { TextboxQuestion  }     from './../../shared';
import { messageREGEXSLASHW, REGEXSLASHW,
    REGEXFRENCH, messageREGEXFRENCH }     from '../../app.constants';

import { IAbstractCreateOrEditQuestionsService } from
    '../abstract/abstract-create-or-edit.questions.service';

export const PersonFormQuestionService:
        IAbstractCreateOrEditQuestionsService = {

    getQuestions: [

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
        })

    ]

};
