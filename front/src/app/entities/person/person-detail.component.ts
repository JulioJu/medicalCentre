import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { IPerson } from '../entities-interface/person.interface';

@Component({
    selector: 'app-person-detail',
    templateUrl: './person-detail.component.html'
})
export class PersonDetailComponent {

    @Input() entityNameVarChild: string;
    @Input() person: IPerson;
    @ContentChild('appPersonTheadAttr') appPersonThead: TemplateRef<any>;
    @ContentChild('appPersonTbodyAttr') appPersonTbody: TemplateRef<any>;

}
