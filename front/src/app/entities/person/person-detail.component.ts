import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { IPerson } from '../entities-interface/person.interface';

@Component({
    selector: 'app-person-detail',
    templateUrl: './person-detail.component.html'
})
export class PersonDetailComponent {

    @Input() public entityNameVarChild: string;
    @Input() public person: IPerson;
    @Input() public isDeleteView: boolean;
    @ContentChild('appPersonTheadAttr') public appPersonThead:
        TemplateRef<string>;
    @ContentChild('appPersonTbodyAttr') public appPersonTbody:
        TemplateRef<string>;

}

// 15 C chemin de chemin de la raude Tassin la Demin Lune.
// deuxième portail à gauche.
// Appel.
// Entre 10 heure et 11 heure Tassin de la Demi Lune !
// 06 71 58 70 19
