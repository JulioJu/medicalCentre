import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { IAbstract } from '../entities-interface/abstract.interface';

@Component({
    selector: 'app-entity-detail',
    templateUrl: './entity-detail.component.html'
})
export class EntityDetailComponent {

    @Input() entityNameVarChild: string;
    @Input() rowTable: IAbstract;
    @Input() isDeleteView: boolean;
    @ContentChild('appAbstractTheadAttr') appAbstractThead: TemplateRef<any>;
    @ContentChild('appAbstractTbodyAttr') appAbstractTbody: TemplateRef<any>;

}
