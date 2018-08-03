import { Component, Input, ViewChild, ElementRef,
    OnInit, AfterViewInit, Renderer } from '@angular/core';
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
    @Input() question: QuestionBase<any>;
    @Input() form: FormGroup;
    @ViewChild('myTemplateRef') input: ElementRef;
    // false if input is not valid AND if input is changed or touched

    isRequired = false;

    constructor(private readonly renderer: Renderer) {}

    ngOnInit(): void {
        if (this.question.required) {
            this.isRequired = true;
        }
    }

    // See http://blog.angularjs.org/2016/04/5-rookie-mistakes-to-avoid-with-angular.html
    ngAfterViewInit(): void {
        if (this.question.autofocus) {
            this.renderer.invokeElementMethod(this.input.nativeElement,
                'focus');
        }
    }

    get abstrControl(): AbstractControl {
        return this.form.controls[this.question.key];
    }

    get isNotValid(): boolean {
        const myInput = this.form.controls[this.question.key];
        return !myInput.valid && (myInput.dirty || myInput.touched);
    }

}
