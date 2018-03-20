import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { INurse } from
    '../entities-interface/nurse.interface';
import { AbstractService } from '../abstract';

type EntityResponseType = HttpResponse<INurse>;

@Injectable()
// See my issue https://github.com/jhipster/generator-jhipster/issues/7302
export class NurseService extends AbstractService {

    constructor(protected readonly http: HttpClient) {
        super(http, SERVER_API_URL + 'mongoose/nurses');
    }

    // tslint:disable-next-line
    create(nurse: INurse): Observable<EntityResponseType> {
        return super.create(nurse);
    }

    update(nurse: INurse): Observable<EntityResponseType> {
        return super.update(nurse);
    }

    find(id: number): Observable<EntityResponseType> {
        return super.find(id);
    }

    query(req?: any): Observable<HttpResponse<INurse[]>> {
        return super.query(req);
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return super.delete(id);
    }

}
