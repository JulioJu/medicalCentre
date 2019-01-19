import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { IPerson } from '../entities-interface/person.interface';

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css']
})
export class PersonComponent {

    @Input() public entityNameVarChild: string;
    @Input() public persons: IPerson[];
    @ContentChild('appPersonTheadAttr') public appPersonThead:
        TemplateRef<string>;
    @ContentChild('appPersonTbodyAttr') public appPersonTbody:
        TemplateRef<string>;

}
