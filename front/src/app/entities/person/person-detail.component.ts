import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { IPerson } from '../entities-interface/person.interface';

@Component({
    selector: 'app-person-detail',
    templateUrl: './person-detail.component.html'
})
export class PersonDetailComponent {

    @Input() public entityNameVarChild: string;
    @Input() public person: IPerson;
    @Input() public isDeleteView: boolean;
    @ContentChild('appPersonTheadAttr') public appPersonThead:
        TemplateRef<string>;
    @ContentChild('appPersonTbodyAttr') public appPersonTbody:
        TemplateRef<string>;
    @ContentChild('appAfterTableAttr') public appAfterTable:
        TemplateRef<string>;
}
