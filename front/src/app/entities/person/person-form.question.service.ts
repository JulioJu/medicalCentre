import { QuestionBase, TextboxQuestion  }     from './../../shared';
import { messageREGEXSLASHW, REGEXSLASHW,
    REGEXFRENCH, messageREGEXFRENCH }     from '../../app.constants';

import { IAbstractFormQuestionService } from
    '../abstract/abstract.questions.service';

export abstract class PersonFormQuestionService implements
        IAbstractFormQuestionService {

    // TODO: get from a remote source of question metadata
    // TODO: make asynchronous
    getQuestions(): QuestionBase<any>[] {

        const REGEXADDRESS = /^[a-zA-ZçÇéÉàèùÀÈÙâêîôûÂÊÎÔÛüëïüÿËÏÜŸ\s'-]+$/;
        const messageREGEXADDRESS = 'french alphanumeric characters'
            + ', including dash, simple quote and spaces.';

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
                title: messageREGEXADDRESS,
                pattern: REGEXADDRESS,
                patternMessage: messageREGEXADDRESS
            })

        ];

        return questions;
    }

}
