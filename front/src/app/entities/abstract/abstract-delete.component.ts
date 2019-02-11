import { OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

// tested with `tsc -p tsconfig.json'
// This import is not generated in the corresponding javascript file.
// tslint:disable:no-implicit-dependencies
import { DeleteWriteOpResultObject } from 'mongodb';

import { AbstractService } from './abstract.service';

import {
    CatchAndDisplayError,
    ShowMongoError
} from './../../shared';

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
            .subscribe(
                // tslint:disable-next-line:max-line-length
                (response: HttpResponse<DeleteWriteOpResultObject['result']>) => {
                    if (!response || !response.body || !response.body.n ||
                        response.body.n === 0) {
                        this.router
                            .navigate([
                                '/' + this.entityNameVar + '-delete/' + id,
                                { confirmation: 'false',
                                  stateDeletion: 'error' }])
                            .catch(CatchAndDisplayError);
                    } else {
                        this.router
                            .navigate([
                                '/' + this.entityNameVar + '-delete/' + id,
                                { confirmation: 'false',
                                  stateDeletion: 'deleted' }
                            ])
                            .catch(CatchAndDisplayError);
                    }
                },
                (ShowMongoError)
            );
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
