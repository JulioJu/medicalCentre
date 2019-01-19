import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-entity-delete',
    templateUrl: './entity-delete.component.html'
})
export class EntityDeleteComponent {

    @Input() public entityNameVarChild: string;
    @Input() public id: string;
    @Input() public stateDeletion: string;

}
