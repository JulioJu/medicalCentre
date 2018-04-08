import { QuestionBase, IOptions } from './question-base';

interface IOptionsText extends IOptions<string> {
    type?: string;
}

export class TextboxQuestion extends QuestionBase<string> {

    controlType = 'textbox';
    type: string;

    constructor(options: IOptionsText) {
        super(options);
        this.type = options.type || '';
    }

}
