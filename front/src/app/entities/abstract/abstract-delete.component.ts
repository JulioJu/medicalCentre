import { OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { AbstractService } from './abstract.service';

import { IAbstract } from '../entities-interface/abstract.interface';

interface IHttpResponseDeletion {
    n: number;
}

export abstract class AbstractDeleteComponent implements OnDestroy, OnInit {

    protected id: string;
    protected stateDeletion: string;
    private routeUnsubscribe: Subscription;
    protected abstract readonly entityNameVar: string;

    public constructor(private readonly abstractService: AbstractService,
        private readonly route: ActivatedRoute,
        private readonly router: Router) {
    }

    private delete(id: string): void {
        this.abstractService
            .delete(id)
            .subscribe((response: HttpResponse<IHttpResponseDeletion
                    | IAbstract>) => {
                if (!response || !response.body || !response.body.n ||
                    response.body.n === 0) {
                    this.router
                        .navigate([
                            '/' + this.entityNameVar + '-delete/' + id,
                            { confirmation: 'false', stateDeletion: 'error' }])
                        .catch((e: Error) => console.error(e));
                } else {
                    this.router
                        .navigate([
                            '/' + this.entityNameVar + '-delete/' + id,
                            { confirmation: 'false', stateDeletion: 'deleted' }
                        ])
                        .catch((e: Error) => console.error(e));
                }
            });
    }

    public ngOnInit(): void {
        this.routeUnsubscribe = this.route.params
        .subscribe((params: Params) => {
            this.id = params.id as string;
            if (params.confirmation && params.confirmation === 'true') {
                this.delete(params.id as string);
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

    public ngOnDestroy(): void {
        if (this.routeUnsubscribe) {
            this.routeUnsubscribe.unsubscribe();
        }
    }

}
