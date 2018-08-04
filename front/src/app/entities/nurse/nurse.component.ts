import { Component } from '@angular/core';

import { AbstractComponent } from '../abstract';
import { INurse } from '../entities-interface/nurse.interface';
import { NurseService } from './nurse.service';

@Component({
    selector: 'app-nurse',
    templateUrl: './nurse.component.html'
})
export class NurseComponent extends AbstractComponent {

    protected readonly entityNameVar = 'nurse';

    protected entityArray: INurse[] | null;

    constructor(nurseService: NurseService) {
        super(nurseService);
    }

}
