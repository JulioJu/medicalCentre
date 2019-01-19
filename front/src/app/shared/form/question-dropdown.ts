import { QuestionBase, IOptions } from './question-base';

interface IOption {
        key: string;
        value?: string;
}
interface IOptionsDropdown extends IOptions<string> {
    options: IOption[];
}

export class DropdownQuestion extends QuestionBase<string> {

    public controlType: string = 'dropdown';
    public options: IOption[] = [];

    public constructor(options: IOptionsDropdown) {
        super(options);
        this.options = options.options;
    }
}
