import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
    // HttpResponse,
    // HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';

import { AbstractService } from '../abstract';

@Injectable()
// See my issue https://github.com/jhipster/generator-jhipster/issues/7302
export class NurseService extends AbstractService {

    public constructor(protected readonly http: HttpClient) {
        super(http, SERVER_API_URL + 'baremongo/nurses');
    }

}
