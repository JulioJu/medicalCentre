import { QuestionBase, IOptions } from './question-base';

interface IOption {
        key: string;
        value?: string;
}
interface IOptionsDropdown extends IOptions<string> {
    options: IOption[];
}

export class DropdownQuestion extends QuestionBase<string> {

    controlType = 'dropdown';
    options: IOption[] = [];

    constructor(options: IOptionsDropdown) {
        super(options);
        this.options = options.options;
    }
}
