export interface IOptions<T> {
    key: string;
    label: string;
    required?: boolean;
    value?: T;
    autofocus?: boolean;
}

export abstract class QuestionBase<T> {

    public key: string;
    public label: string;
    public required: boolean;
    public value: T;
    public autofocus?: boolean;

    public abstract controlType: string;

    public constructor(options: IOptions<T>) {
        this.key = options.key;
        this.label = options.label;
        this.required = !!options.required;
        this.value = options.value as T;
        this.autofocus = options.autofocus;
    }

}
