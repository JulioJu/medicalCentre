import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators,
    ValidatorFn, AbstractControl } from '@angular/forms';

import * as moment          from 'moment';

import { REGEXW3CEMAIL } from '../../app.constants';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';

type returnValidator = {[key: string]: {value: any}} | null;

@Injectable()
export class QuestionControlService {

    private dateValidator(extremDate: Date, methodTest: 'isBefore' | 'isAfter',
            errorName: string): ValidatorFn | null {
        return (control: AbstractControl): returnValidator => {
            let forbidden: boolean;
            const date = moment(control.value);
            // If isn't castable, console.error automatically:
            // « Deprecation warning: value provided is not in a recognized
            // RFC2822 or ISO format. moment construction falls back to js
            // Date()… + »
            // No solution to avoid found this console.error()
            if (!date.isValid()) {
                return {dateInvalid: {value: control.value}};
            }
            (moment(control.value))[methodTest](extremDate)
                ? forbidden = true
                : forbidden = false;
            // tslint:disable-next-line:no-null-keyword
            return forbidden ? {[errorName]: {value: control.value}} : null;
        };
    }

    private addMinMaxValidator(minOrMax: 'min' | 'max', qT: TextboxQuestion,
                arrayValidators: ValidatorFn[]): void {
        // tslint:disable:no-string-literal
        if (typeof qT[minOrMax] === 'object') {
            let dateValidatorVar;
            minOrMax === 'min'
                ? dateValidatorVar = this.dateValidator(qT[minOrMax] as Date
                    , 'isBefore', 'dateTooEarly')
                : dateValidatorVar = this.dateValidator(qT[minOrMax] as Date
                    , 'isAfter', 'dateTooLate');
            if (dateValidatorVar !== null) {
                arrayValidators.push(dateValidatorVar);
            }
        } else if (qT[minOrMax]) {
            const myNumber = qT[minOrMax] as number;
            arrayValidators.push(Validators[minOrMax](myNumber));
        }
    }

    toFormGroup(questions: QuestionBase<any>[]): FormGroup  {
        const group: {[key: string]: FormControl} = {};

        questions.forEach(question => {
            const arrayValidators: ValidatorFn[] = [];
            if (question.required) {
                arrayValidators.push(Validators.required);
            }
            if (question.controlType === 'textbox') {
                const qT = question as TextboxQuestion;
                if (qT.minLength) {
                    arrayValidators.push(Validators.minLength(qT.minLength));
                }
                if (qT.maxLength) {
                    arrayValidators.push(Validators.maxLength(qT.maxLength));
                }
                this.addMinMaxValidator('min', qT, arrayValidators);
                this.addMinMaxValidator('max', qT, arrayValidators);
                if (qT.type === 'email') {
                    // arrayValidators.push(Validators.email);
                    // See comment in app.constant.ts
                    qT.patternMessage = 'an email';
                    arrayValidators.push(Validators
                        .pattern(REGEXW3CEMAIL));
                }
                if (qT.pattern) {
                    arrayValidators.push(Validators.pattern(qT.pattern));
                }
            }
            group[question.key] = new FormControl(question.value || '',
                arrayValidators);
        });
        return new FormGroup(group);
    }

}
