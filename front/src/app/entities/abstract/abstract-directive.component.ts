import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-abstract',
    templateUrl: './abstract.component.html',
    styleUrls: ['./abstract.component.css']
})
export class AbstractDirectiveComponent {

    // tslint:disable-next-line
    @Input('entityNameAttr') entityNameVarChild: string;

}
