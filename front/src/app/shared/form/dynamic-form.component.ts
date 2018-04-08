import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { QuestionBase } from './question-base';
import { QuestionControlService } from './question-control.service';

@Component({
    selector: 'app-dynamic-form',
    styles: [`
        .form-row{
            margin-top: 10px;
        }`],
    templateUrl: './dynamic-form.component.html',
    providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

    @Input() questions: QuestionBase<any>[] = [];
    form: FormGroup;
    payLoad = '';

    constructor(private readonly qcs: QuestionControlService) {  }

    ngOnInit(): void {
        this.form = this.qcs.toFormGroup(this.questions);
    }

    onSubmit(): void {
        this.payLoad = JSON.stringify(this.form.value);
    }

}
