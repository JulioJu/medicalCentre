import { Injectable }       from '@angular/core';

import { QuestionBase }     from './../../shared';

import { IAbstractFormQuestionService } from
    '../abstract/abstract.questions.service';

import { PersonFormQuestionService } from
    '../person/person-form.question.service';

// TODO should become plain object
@Injectable()
export class NurseFormQuestionService implements IAbstractFormQuestionService {

    public getQuestions: Array<QuestionBase<string>> =
        PersonFormQuestionService.getQuestions;
}
