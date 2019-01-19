import { Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { IAbstract } from '../entities-interface/abstract.interface';
import { AbstractService } from './abstract.service';

export abstract class AbstractDetailComponent implements OnInit {

    @Input() isDeleteView: boolean;

    protected rowTable: IAbstract | null;

    constructor(private readonly abstractService: AbstractService,
        private readonly route: ActivatedRoute) {}

    private load(id: string): void {
        this.abstractService
            .find(id)
            .subscribe((abstractResponse: HttpResponse<IAbstract>) => {
                this.rowTable = abstractResponse.body;
            });
    }

    public ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.load(params.id);
        });
    }

}
