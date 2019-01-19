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
    public headers: HttpHeaders;
    public status: number;
    public statusText: string;
    public url: string | null;
    public ok: boolean;
    public name: 'HttpErrorResponse';
    public message: string;
    public error: {
        error_message: string;
        error_message_origin: 'mongo' | 'back';
        // tsint:disable-next-line:no-any
        details: {};
    };
}
