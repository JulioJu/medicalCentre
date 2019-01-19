import { OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { IAbstract } from '../entities-interface/abstract.interface';

export abstract class AbstractComponent implements OnInit {

    protected tableDB: IAbstract[] | null;

    constructor(protected readonly abstractService: AbstractService) {
    }

    private onError(errorMessage: string): void {
        // TODO
        throw new Error(errorMessage);
    }

    public ngOnInit(): void {
        this.abstractService.query()
            .subscribe(
                (res: HttpResponse<IAbstract[]>) => {
                    this.tableDB = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

}
