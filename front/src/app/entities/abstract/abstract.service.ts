import { HttpClient,
    HttpResponse,
    HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IAbstract } from
    '../entities-interface/abstract.interface';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<any> | HttpErrorResponse;

// See my issue https://github.com/jhipster/generator-jhipster/issues/7302
export abstract class AbstractService {

    constructor(protected readonly http: HttpClient,
        protected readonly resourceUrl: string) {}

    insertOrUpdate(abtractI: IAbstract): Observable<EntityResponseType> {
        return this.http
            .put<IAbstract>(this.resourceUrl, abtractI,
                { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IAbstract>(`${this.resourceUrl}/${id}`,
                { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<any[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<IAbstract[]>(this.resourceUrl, { params: options,
                observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`,
            { observe: 'response'});
    }

}
