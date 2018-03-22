import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-abstract-detail',
    templateUrl: './abstract-detail.directive.component.html'
})
export class AbstractDetailDirectiveComponent {

    @Input() entityNameVarChild: string;

    previousState(): void {
        window.history.back();
    }

}
