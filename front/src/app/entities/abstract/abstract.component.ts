import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { IAbstract } from '../entities-interface/abstract.interface';

export abstract class AbstractComponent {

    protected entityArray: IAbstract[] | null;

    constructor(protected readonly abstractService: AbstractService) {
    }

    ngOnInitAbstract(): void {
        this.abstractService.query()
            .subscribe(
                (res: HttpResponse<IAbstract[]>) => {
                    // tslint:disable-next-line
                    this.entityArray = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onError(errorMessage: string): void {
        // TODO
        throw new Error(errorMessage);
    }

}
