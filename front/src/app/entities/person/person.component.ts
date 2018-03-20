import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { IPerson } from '../entities-interface/person.interface';

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css']
})
export class PersonComponent {

    // tslint:disable-next-line
    @Input() entityNameVarChild: string;
    @Input() persons: IPerson[];
    @ContentChild('appPersonTheadAttr') appPersonThead: TemplateRef<any>;
    @ContentChild('appPersonTbodyAttr') appPersonTbody: TemplateRef<any>;

}
