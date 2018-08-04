import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INurse } from '../entities-interface/nurse.interface';
import { NurseService } from './nurse.service';

import { AbstractDetailComponent } from '../abstract';

@Component({
    selector: 'app-nurse-detail',
    templateUrl: './nurse-detail.component.html'
})
export class NurseDetailComponent extends AbstractDetailComponent  {

    protected readonly entityNameVar = 'nurse';

    entity: INurse | null;

    constructor(nurseService: NurseService, route: ActivatedRoute) {
        super(nurseService, route);
    }

}
