import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { IAbstract } from '../entities-interface/abstract.interface';

@Component({
    selector: 'app-abstract-detail',
    templateUrl: './abstract-detail.directive.component.html'
})
export class AbstractDetailDirectiveComponent {

    @Input() entityNameVarChild: string;
    @Input() entity: IAbstract;
    @ContentChild('appAbstractTheadAttr') appAbstractThead: TemplateRef<any>;
    @ContentChild('appAbstractTbodyAttr') appAbstractTbody: TemplateRef<any>;

    previousState(): void {
        window.history.back();
    }

}
