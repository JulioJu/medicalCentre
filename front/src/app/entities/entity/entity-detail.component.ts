import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { IAbstract } from '../entities-interface/abstract.interface';

import * as moment  from 'moment';

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

    protected displayMomentDate =
        (momentDate: string | undefined): string | undefined => {
        // If momentDate is undefined return actual date
        if (momentDate) {
            // If momentDate is invalid, return "Invalid Date"
            return moment(momentDate)
                .toString();
        }
        return undefined;
    }

}
