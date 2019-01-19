import { HttpClient,
    HttpResponse,
    HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAbstract } from
    '../entities-interface/abstract.interface';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<IAbstract> | HttpErrorResponse;

// See my issue https://github.com/jhipster/generator-jhipster/issues/7302
export abstract class AbstractService {

    public constructor(protected readonly http: HttpClient,
        protected readonly resourceUrl: string) {}

    public insertOrUpdate(abtractI: IAbstract): Observable<EntityResponseType> {
        return this.http
            .put<IAbstract>(this.resourceUrl, abtractI,
                { observe: 'response' });
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

    public delete(id: string): Observable<HttpResponse<IAbstract>> {
        return this.http.delete<IAbstract>(`${this.resourceUrl}/${id}`,
            { observe: 'response'});
    }

}
