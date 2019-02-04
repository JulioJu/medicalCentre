import { Injectable }       from '@angular/core';

import { QuestionBase }     from './../../shared';

import { IAbstractCreateOrEditQuestionsService } from
    '../abstract/abstract-create-or-edit.questions.service';

import { PersonFormQuestionService } from
    '../person/person-create-or-edit.questions.service';

// TODO should become plain object
@Injectable()
export class NurseCreateOrEditQuestionsService implements
        IAbstractCreateOrEditQuestionsService {

    public getQuestions: Array<QuestionBase<string>> =
        PersonFormQuestionService.getQuestions;
}
