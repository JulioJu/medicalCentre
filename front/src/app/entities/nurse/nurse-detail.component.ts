import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INurse } from '../entities-interface/nurse.interface';
import { NurseService } from './nurse.service';

import { AbstractDetailInheritanceComponent } from '../abstract';

@Component({
    selector: 'app-nurse-detail',
    templateUrl: './nurse-detail.component.html'
})
export class NurseDetailComponent extends
        AbstractDetailInheritanceComponent implements OnInit {

    protected readonly entityNameVar = 'Nurse';

    protected entity: INurse | null;

    constructor(nurseService: NurseService, route: ActivatedRoute) {
        super(nurseService, route);
    }

    ngOnInit(): void {
        super.ngOnInitAbstract();
    }

}
