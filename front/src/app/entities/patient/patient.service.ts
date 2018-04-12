import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { IPatient } from
    '../entities-interface/patient.interface';
import { AbstractService } from '../abstract';

type EntityResponseType = HttpResponse<IPatient>;

@Injectable()
// See my issue https://github.com/jhipster/generator-jhipster/issues/7302
export class PatientService extends AbstractService {

    constructor(protected readonly http: HttpClient) {
        super(http, SERVER_API_URL + 'mongoose/patients');
    }

    create(patient: IPatient): Observable<EntityResponseType> {
        return super.create(patient);
    }

    update(patient: IPatient): Observable<EntityResponseType> {
        return super.update(patient);
    }

    find(id: string): Observable<EntityResponseType> {
        return super.find(id);
    }

    query(req?: any): Observable<HttpResponse<IPatient[]>> {
        return super.query(req);
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return super.delete(id);
    }

}
