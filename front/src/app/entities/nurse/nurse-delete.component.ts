import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NurseService } from './nurse.service';

import { AbstractDeleteComponent } from '../abstract';

@Component({
    selector: 'app-nurse-delete',
    templateUrl: './nurse-delete.component.html'
})
export class NurseDeleteComponent extends
        AbstractDeleteComponent {

    protected readonly entityNameVar: string = 'nurse';

    public constructor(nurseService: NurseService,
        route: ActivatedRoute,
        router: Router) {
        super(nurseService, route, router);
    }

}
