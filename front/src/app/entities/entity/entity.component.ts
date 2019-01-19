import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { IAbstract } from '../entities-interface';

@Component({
    selector: 'app-entity',
    templateUrl: './entity.component.html',
    styleUrls: ['./entity.component.css']
})
export class EntityComponent {

    @Input() public entityNameVarChild: string;
    @Input() public tableDB: IAbstract[];
    @ContentChild('appAbstractTheadAttr') public appAbstractThead:
        TemplateRef<string>;
    @ContentChild('appAbstractTbodyAttr') public appAbstractTbody:
        TemplateRef<string>;

}
