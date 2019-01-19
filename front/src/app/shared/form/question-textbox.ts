import { QuestionBase, IOptions } from './question-base';

interface IOptionsText extends IOptions<string> {
    type?: string;
    placeholder?: string;
    readonly?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: Date | number;
    max?: Date | number;
    title?: string;
    pattern?: RegExp;
    patternMessage?: string;
}

export class TextboxQuestion extends QuestionBase<string> {

    public controlType: string = 'textbox';
    public type: string;
    public placeholder?: string;
    public readonly?: boolean;
    public minLength?: number;
    public maxLength?: number;
    public min?: Date | number;
    public max?: Date | number;
    public title?: string;
    public pattern?: RegExp;
    public patternMessage: string;

    public constructor(options: IOptionsText) {
        super(options);
        this.type = options.type || 'text';
        this.placeholder = options.placeholder;
        this.minLength = options.minLength;
        this.maxLength = options.maxLength;
        this.readonly = options.readonly || false;
        this.min = options.min;
        this.max = options.max;
        this.title = options.title;
        this.pattern = options.pattern;
        this.patternMessage = options.patternMessage || '';
    }

}
