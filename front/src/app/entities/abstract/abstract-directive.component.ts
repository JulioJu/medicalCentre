import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-abstract',
    templateUrl: './abstract-directive.component.html',
    styleUrls: ['./abstract-directive.component.css']
})
export class AbstractDirectiveComponent {

    // tslint:disable-next-line
    @Input() entityNameVarChild: string;

}
