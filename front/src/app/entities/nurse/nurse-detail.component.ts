import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NurseService } from './nurse.service';

import { AbstractDetailComponent } from '../abstract';

@Component({
    selector: 'app-nurse-detail',
    templateUrl: './nurse-detail.component.html'
})
export class NurseDetailComponent extends AbstractDetailComponent  {

    protected readonly entityNameVar: string = 'nurse';

    public constructor(nurseService: NurseService, route: ActivatedRoute) {
        super(nurseService, route);
    }

}
