import { Component, OnInit } from '@angular/core';
import { NurseService } from './nurse.service';
import { AbstractComponent } from '../abstract';

@Component({
    selector: 'app-nurse',
    templateUrl: './nurse.component.html'
})
export class NurseComponent extends AbstractComponent implements OnInit {

    protected readonly entityNameVar = 'Nurse';

    constructor(nurseService: NurseService) {
        super(nurseService);
    }

    ngOnInit(): void {
        super.ngOnInitAbstract();
    }

}
