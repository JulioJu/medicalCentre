import { Injectable }       from '@angular/core';

import { QuestionBase }     from './../../shared';

import { IAbstractFormQuestionService } from
    '../abstract/abstract.questions.service';

import { PersonFormQuestionService } from
    '../person/person-form.question.service';

@Injectable()
export class NurseFormQuestionService extends PersonFormQuestionService
    implements IAbstractFormQuestionService {

    // TODO: get from a remote source of question metadata
    // TODO: make asynchronous
    getQuestions(): QuestionBase<any>[] {
        return super.getQuestions();
    }

}
