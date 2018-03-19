import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { IPatient } from
    '../entities-interface/patient.interface';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<IPatient>;

@Injectable()
// See my issue https://github.com/jhipster/generator-jhipster/issues/7302
export class PatientService {

    private readonly resourceUrl =  SERVER_API_URL + 'mongoose/patients';

    constructor(private readonly http: HttpClient) { }

    create(patient: IPatient): Observable<EntityResponseType> {
        return this.http
            .post<IPatient>(this.resourceUrl, patient, { observe: 'response' });
    }

    update(patient: IPatient): Observable<EntityResponseType> {
        return this.http
            .put<IPatient>(this.resourceUrl, patient, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPatient>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<IPatient[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<IPatient[]>(this.resourceUrl, { params: options,
                observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`,
            { observe: 'response'});
    }

}
