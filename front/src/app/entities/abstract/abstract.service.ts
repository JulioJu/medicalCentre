import { HttpClient,
    HttpResponse,
    HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// tested with `tsc -p tsconfig.json'
// This import is not generated in the corresponding javascript file.
// tslint:disable:no-implicit-dependencies
import { FindAndModifyWriteOpResultObject,
    DeleteWriteOpResultObject
} from 'mongodb';

import { IAbstract } from
    '../entities-interface/abstract.interface';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<IAbstract> | HttpErrorResponse;

// See my issue https://github.com/jhipster/generator-jhipster/issues/7302
export abstract class AbstractService {

    public constructor(protected readonly http: HttpClient,
        protected readonly resourceUrl: string) {}

    public insertOrUpdate(abtractI: IAbstract):
            // tslint:disable-next-line:max-line-length
            Observable<HttpResponse<FindAndModifyWriteOpResultObject<IAbstract>>> {
        return this.http
            .put<FindAndModifyWriteOpResultObject<IAbstract>>(
                this.resourceUrl, abtractI, { observe: 'response' });
    }

    public find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IAbstract>(`${this.resourceUrl}/${id}`,
                { observe: 'response'});
    }

    public query(req?: string): Observable<HttpResponse<IAbstract[]>> {
        const options: HttpParams = createRequestOption(req);
        return this.http
            .get<IAbstract[]>(this.resourceUrl,
                { params: options, observe: 'response' });
    }

    public delete(id: string):
            Observable<HttpResponse<DeleteWriteOpResultObject['result']>> {
        return this.http.delete<DeleteWriteOpResultObject['result']>
        (`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

}
