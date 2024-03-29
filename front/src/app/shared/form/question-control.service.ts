import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators,
    ValidatorFn, AbstractControl } from '@angular/forms';

import * as moment  from 'moment';

import { REGEXW3CEMAIL } from '../../shared/validator';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';

import { IAbstract } from
    '../../entities/entities-interface/abstract.interface';

type returnValidator = {[key: string]: {value: string}} | null;

@Injectable()
export class QuestionControlService {

    private readonly dateValidator =
        (extremDate: Date, methodTest: 'isBefore' | 'isAfter',
            errorName: string): ValidatorFn | null =>
        (control: AbstractControl): returnValidator => {
            let forbidden: boolean;
            const date: moment.Moment = moment(control.value as string);
            // If isn't castable, console.error automatically:
            // « Deprecation warning: value provided is not in a recognized
            // RFC2822 or ISO format. moment construction falls back to js
            // Date()… + »
            // No solution to avoid found this console.error()
            if (!date.isValid()) {
                return {dateInvalid: {value: control.value as string}};
            }
            (moment(control.value as string))[methodTest](extremDate)
                ? forbidden = true
                : forbidden = false;
            return forbidden ? {[errorName]: {value: control.value as string}}
            // tslint:disable-next-line:no-null-keyword
                : null;
    }

    private addMinMaxValidator(minOrMax: 'min' | 'max', qT: TextboxQuestion,
                arrayValidators: ValidatorFn[]): void {
        // tslint:disable:no-string-literal
        if (typeof qT[minOrMax] === 'object') {
            let dateValidatorVar: ValidatorFn | null;
            minOrMax === 'min'
                ? dateValidatorVar = this.dateValidator(qT[minOrMax] as Date
                    , 'isBefore', 'dateTooEarly')
                : dateValidatorVar = this.dateValidator(qT[minOrMax] as Date
                    , 'isAfter', 'dateTooLate');
            if (dateValidatorVar !== null) {
                arrayValidators.push(dateValidatorVar);
            }
        } else if (qT[minOrMax]) {
            const myNumber: number = qT[minOrMax] as number;
            arrayValidators.push(Validators[minOrMax](myNumber));
        }
    }

    // tslint:disable-next-line:cognitive-complexity
    public async toFormGroup(questions: Array<QuestionBase<string>>,
            formDatas?: IAbstract): Promise<FormGroup>  {
        const group: {[key: string]: FormControl} = {};

        // Emulate latency
        // tslint:disable-next-line:no-inferred-empty-object-type
        await new Promise(((res: () => void): void => {
                // tslint:disable-next-line:no-magic-numbers
                setTimeout(res, 1000);
            })
        );

        questions.forEach((question: QuestionBase<string>) => {
            const arrayValidators: ValidatorFn[] = [];
            if (question.required) {
                // Could be ignore
                // https://github.com/palantir/tslint/issues/2651
                // tslint:disable-next-line:no-unbound-method
                arrayValidators.push(Validators.required);
            }
            if (question.controlType === 'textbox') {
                const qT: TextboxQuestion = question as TextboxQuestion;
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
                if (formDatas) {
                    qT.type === 'date'
                        ? question.value =
                            // Actually date is in stored as
                            // https://en.wikipedia.org/wiki/ISO_8601
                            // tslint:disable-next-line:no-magic-numbers
                            (formDatas[qT.key] as string).substring(0, 10)
                        : question.value = (formDatas[qT.key] as string);
                }
            } else {
                if (formDatas) {
                    question.value = formDatas[question.key] as string;
                }
            }

            group[question.key] = new FormControl(question.value || '',
                arrayValidators);
            if (!question.value) {
                group[question.key].markAsUntouched({ onlySelf: true });
                group[question.key].markAsPristine({ onlySelf: true});
            }
        });

        return new FormGroup(group);
    }

}
