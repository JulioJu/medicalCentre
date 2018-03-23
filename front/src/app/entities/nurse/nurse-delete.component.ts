import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NurseService } from './nurse.service';

import { AbstractDeleteComponent } from '../abstract';

@Component({
    selector: 'app-nurse-delete',
    templateUrl: './nurse-delete.component.html'
})
export class NurseDeleteComponent extends
        AbstractDeleteComponent implements OnInit {

    protected readonly entityNameVar = 'nurse';

    constructor(nurseService: NurseService,
        route: ActivatedRoute,
        router: Router) {
        super(nurseService, route, router);
    }

    ngOnInit(): void {
        super.ngOnInitAbstract();
    }

}
