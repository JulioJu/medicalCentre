import { Injectable } from '@angular/core';
import { HttpClient,
    HttpResponse,
    HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';

import { INurse } from
    '../entities-interface/nurse.interface';
import { AbstractService } from '../abstract';

type EntityResponseType = HttpResponse<INurse> | HttpErrorResponse;

@Injectable()
// See my issue https://github.com/jhipster/generator-jhipster/issues/7302
export class NurseService extends AbstractService {

    public constructor(protected readonly http: HttpClient) {
        super(http, SERVER_API_URL + 'mongoose/nurses');
    }

    public insertOrUpdate(nurse: INurse): Observable<EntityResponseType> {
        return super.insertOrUpdate(nurse) as Observable<EntityResponseType>;
    }

    public find(id: string): Observable<EntityResponseType> {
        return super.find(id) as Observable<EntityResponseType>;
    }

    public query(req?: string): Observable<HttpResponse<INurse[]>> {
        return super.query(req) as Observable<HttpResponse<INurse[]>>;
    }

    public delete(id: string): Observable<HttpResponse<INurse>> {
        return super.delete(id) as Observable<HttpResponse<INurse>> ;
    }

}
