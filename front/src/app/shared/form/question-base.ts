export interface IOptions<T> {
    key: string;
    label: string;
    required?: boolean;
    value?: T;
    autofocus?: boolean;
}

export abstract class QuestionBase<T> {

    key: string;
    label: string;
    required: boolean;
    value: T;
    autofocus?: boolean;

    abstract controlType: string;

    constructor(options: IOptions<T>) {
        this.key = options.key;
        this.label = options.label;
        this.required = !!options.required;
        this.value = options.value as T;
        this.autofocus = options.autofocus;
    }

}
