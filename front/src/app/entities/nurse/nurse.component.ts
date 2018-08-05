import { Component } from '@angular/core';

import { AbstractComponent } from '../abstract';
import { NurseService } from './nurse.service';

@Component({
    selector: 'app-nurse',
    templateUrl: './nurse.component.html'
})
export class NurseComponent extends AbstractComponent {

    protected readonly entityNameVar = 'nurse';

    constructor(nurseService: NurseService) {
        super(nurseService);
    }

}
