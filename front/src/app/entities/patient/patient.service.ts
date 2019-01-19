import { Injectable } from '@angular/core';
import { HttpClient,
    HttpResponse,
    HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';

import { IPatient } from
    '../entities-interface/patient.interface';
import { AbstractService } from '../abstract';

type EntityResponseType = HttpResponse<IPatient> | HttpErrorResponse;

@Injectable()
// See my issue https://github.com/jhipster/generator-jhipster/issues/7302
export class PatientService extends AbstractService {

    public constructor(protected readonly http: HttpClient) {
        super(http, SERVER_API_URL + 'mongoose/patients');
    }

    public insertOrUpdate(patient: IPatient): Observable<EntityResponseType> {
        return super.insertOrUpdate(patient) as Observable<EntityResponseType>;
    }

    public find(id: string): Observable<EntityResponseType> {
        return super.find(id) as Observable<EntityResponseType>;
    }

    public query(req?: string): Observable<HttpResponse<IPatient[]>> {
        return super.query(req) as Observable<HttpResponse<IPatient[]>>;
    }

    public delete(id: string): Observable<HttpResponse<IPatient>> {
        return super.delete(id) as Observable<HttpResponse<IPatient>> ;
    }

}
