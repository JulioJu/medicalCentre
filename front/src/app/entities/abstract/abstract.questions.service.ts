
import { QuestionBase }     from './../../shared';

export interface IAbstractFormQuestionService {

    // TODO: get from a remote source of question metadata
    // TODO: make asynchronous
    getQuestions(): QuestionBase<any>[] ;

}
