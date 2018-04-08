import { OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AbstractService } from './abstract.service';

export abstract class AbstractDeleteComponent implements OnDestroy {

    protected id: string;

    protected stateDeletion: string;

    protected abstract readonly entityNameVar: string;

    protected routeUnsubscribe: Subscription;

    protected readonly isDeleteView = true;

    constructor(private readonly abstractService: AbstractService,
        private readonly route: ActivatedRoute,
        private readonly router: Router) {}

    ngOnInitAbstract(): void {
        this.routeUnsubscribe = this.route.params.subscribe(params => {
            this.id = params.id;
            if (params.confirmation && params.confirmation === 'true') {
                this.delete(params.id);
            }
            if (!params.stateDeletion) {
                this.stateDeletion = 'notTried';
            } else if (params.stateDeletion === 'deleted') {
                this.stateDeletion = 'deleted';
            } else if (params.stateDeletion === 'error') {
                this.stateDeletion = 'error';
            } else {
                this.stateDeletion = 'notTried';
            }
        });
    }

    delete(id: string): void {
        this.abstractService
            .delete(id)
            .subscribe((response) => {
                if (!response || !response.body || !response.body.n ||
                    response.body.n === 0) {
                    this.router
                        .navigate(['/' + this.entityNameVar + '-delete/' + id,
                            { confirmation: 'false', stateDeletion: 'error' }]);
                } else {
                    this.router
                        .navigate(['/' + this.entityNameVar + '-delete/' + id,
                            { confirmation: 'false',
                                stateDeletion: 'deleted' }]);
                }
            });
    }

    ngOnDestroy(): void {
        if (this.routeUnsubscribe) {
            this.routeUnsubscribe.unsubscribe();
        }
    }

}