import { QuestionBase, IOptions } from './question-base';

interface IOptionsText extends IOptions<string> {
    type?: string;
    placeholder?: string;
    readonly?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: Date | number;
    max?: Date | number;
    pattern?: RegExp;
    patternMessage?: string;
}

export class TextboxQuestion extends QuestionBase<string> {

    controlType = 'textbox';
    type: string;
    placeholder?: string;
    readonly?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: Date | number;
    max?: Date | number;
    pattern?: RegExp;
    patternMessage: string;

    constructor(options: IOptionsText) {
        super(options);
        this.type = options.type || 'text';
        this.placeholder = options.placeholder;
        this.minLength = options.minLength;
        this.maxLength = options.maxLength;
        this.readonly = options.readonly || false;
        this.min = options.min;
        this.max = options.max;
        this.pattern = options.pattern;
        this.patternMessage = options.patternMessage || '';
    }

}
