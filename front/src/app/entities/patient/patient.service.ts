import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PatientInterface as Patient } from
    '../entities-interface/patient.interface';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<Patient>;

@Injectable()
// See my issue https://github.com/jhipster/generator-jhipster/issues/7302
export class PatientService {

    private readonly resourceUrl =  SERVER_API_URL + 'mongoose/patients';

    constructor(private readonly http: HttpClient) { }

    create(patient: Patient): Observable<EntityResponseType> {
        return this.http
            .post<Patient>(this.resourceUrl, patient, { observe: 'response' });
    }

    update(patient: Patient): Observable<EntityResponseType> {
        return this.http
            .put<Patient>(this.resourceUrl, patient, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Patient>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Patient[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Patient[]>(this.resourceUrl, { params: options,
                observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`,
            { observe: 'response'});
    }

}
