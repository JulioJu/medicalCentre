import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { IAbstract } from '../entities-interface/abstract.interface';

@Component({
    selector: 'app-abstract',
    templateUrl: './abstract.directive.component.html',
    styleUrls: ['./abstract.directive.component.css']
})
export class AbstractDirectiveComponent {

    @Input() entityNameVarChild: string;
    @Input() entities: IAbstract[];
    @ContentChild('appAbstractTheadAttr') appAbstractThead: TemplateRef<any>;
    @ContentChild('appAbstractTbodyAttr') appAbstractTbody: TemplateRef<any>;

}
