import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-entity-delete',
    templateUrl: './entity-delete.component.html'
})
export class EntityDeleteComponent {

    @Input() entityNameVarChild: string;
    @Input() id: string;
    @Input() stateDeletion: string;

}
