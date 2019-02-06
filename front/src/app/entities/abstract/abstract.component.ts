import { OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { IAbstract } from '../entities-interface/abstract.interface';

import {
    ShowMongoError
} from './../../shared';

export abstract class AbstractComponent implements OnInit {

    protected tableDB: IAbstract[] | null;

    public constructor(protected readonly abstractService: AbstractService) {
    }

    public ngOnInit(): void {
        this.abstractService.query()
            .subscribe(
                (res: HttpResponse<IAbstract[]>) => {
                    this.tableDB = res.body;
                },
                (ShowMongoError)
            );
    }

}
