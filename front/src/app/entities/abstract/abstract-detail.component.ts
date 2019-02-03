import { Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { IAbstract } from '../entities-interface/abstract.interface';
import { AbstractService } from './abstract.service';

import * as moment  from 'moment';

export abstract class AbstractDetailComponent implements OnInit {

    @Input() public isDeleteView: boolean;

    protected rowTable: IAbstract | null;

    public constructor(private readonly abstractService: AbstractService,
        private readonly route: ActivatedRoute) {}

    private load(id: string): void {
        this.abstractService
            .find(id)
            .subscribe((abstractResponse: HttpResponse<IAbstract>) => {
                this.rowTable = abstractResponse.body;
                if (this.rowTable && this.rowTable.createdAt
                    && typeof this.rowTable.createdAt === 'string') {
                    console.log(moment(this.rowTable.createdAt));
                }
            });
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.load(params.id as string);
        });
    }

}
