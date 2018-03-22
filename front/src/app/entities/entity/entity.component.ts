import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { IAbstract } from '../entities-interface';

@Component({
    selector: 'app-entity',
    templateUrl: './entity.component.html',
    styleUrls: ['./entity.component.css']
})
export class EntityComponent {

    @Input() entityNameVarChild: string;
    @Input() entities: IAbstract[];
    @ContentChild('appAbstractTheadAttr') appAbstractThead: TemplateRef<any>;
    @ContentChild('appAbstractTbodyAttr') appAbstractTbody: TemplateRef<any>;

}
