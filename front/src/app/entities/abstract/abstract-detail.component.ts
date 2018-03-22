import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { IAbstract } from '../entities-interface/abstract.interface';
import { AbstractService } from './abstract.service';

export abstract class AbstractDetailComponent {

    protected abstract entity: IAbstract | null;

    constructor(private readonly abstractService: AbstractService,
        private readonly route: ActivatedRoute) {}

    ngOnInitAbstract(): void {
        this.route.params.subscribe(params => {
            this.load(params.id);
        });
    }

    load(id: string): void {
        this.abstractService
            .find(id)
            .subscribe((abstractResponse: HttpResponse<IAbstract>) => {
                this.entity = abstractResponse.body;
            });
    }

}
