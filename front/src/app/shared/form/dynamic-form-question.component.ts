import { Component, Input, ViewChild, ElementRef,
    OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, AbstractControl }        from '@angular/forms';

import { QuestionBase }     from './question-base';

@Component({
    selector: 'app-question',
    styles: [`
        .errorMessage{
            color:red;
        }`],
    templateUrl: './dynamic-form-question.component.html',
    styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent implements AfterViewInit, OnInit {
    @Input() public question: QuestionBase<string>;
    @Input() public form: FormGroup;
    @ViewChild('myTemplateRef') public input: ElementRef;
    // false if input is not valid AND if input is changed or touched

    public isRequired: boolean = false;

    public ngOnInit(): void {
        if (this.question.required) {
            this.isRequired = true;
        }
    }

    // See http://blog.angularjs.org/2016/04/5-rookie-mistakes-to-avoid-with-angular.html
    // https://github.com/angular/angular/issues/15674
    public ngAfterViewInit(): void {
        if (this.question.autofocus) {
            (this.input as ElementRef<HTMLInputElement>).nativeElement.focus();
        }
    }

    public get abstrControl(): AbstractControl {
        return this.form.controls[this.question.key];
    }

    public get isNotValid(): boolean {
        const myInput: AbstractControl = this.form.controls[this.question.key];
        return !myInput.valid && (myInput.dirty || myInput.touched);
    }

}
