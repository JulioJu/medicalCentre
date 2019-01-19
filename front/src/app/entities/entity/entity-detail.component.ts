import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { IAbstract } from '../entities-interface/abstract.interface';

@Component({
    selector: 'app-entity-detail',
    templateUrl: './entity-detail.component.html'
})
export class EntityDetailComponent {

    @Input() public entityNameVarChild: string;
    @Input() public rowTable: IAbstract;
    @Input() public isDeleteView: boolean;
    @ContentChild('appAbstractTheadAttr') public appAbstractThead:
        TemplateRef<string>;
    @ContentChild('appAbstractTbodyAttr') public appAbstractTbody:
        TemplateRef<string>;

}
