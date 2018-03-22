import { Component, OnInit } from '@angular/core';
import { NurseService } from './nurse.service';
import { AbstractInheritanceComponent } from '../abstract';
import { INurse } from '../entities-interface/nurse.interface';

@Component({
    selector: 'app-nurse',
    templateUrl: './nurse.component.html'
})
export class NurseComponent extends AbstractInheritanceComponent
        implements OnInit {

    protected readonly entityNameVar = 'nurse';

    protected entityArray: INurse[] | null;

    constructor(nurseService: NurseService) {
        super(nurseService);
    }

    ngOnInit(): void {
        super.ngOnInitAbstract();
    }

}
