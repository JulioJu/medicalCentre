import { HttpHeaders } from '@angular/common/http';

// Used in:
// front/src/app/entities/abstract/abstract-form.dynamic-form.component.ts
// =========

// Referenced in
// back/app/entities/abstract/abstract.route.ts
// =========

// https://angular.io/api/common/http/HttpErrorResponse
// HttpErrorResponse should be redefine, because contratry to HttpResponse,
// HttpErrorResponse is not generic;
export declare class IHttpErrorResponseFormPutError {
    headers: HttpHeaders;
    status: number;
    statusText: string;
    url: string | null;
    ok: boolean;
    name: 'HttpErrorResponse';
    message: string;
    error: {
        error_message: string;
        error_message_origin: 'mongo' | 'back';
        details: any;
    };
}
