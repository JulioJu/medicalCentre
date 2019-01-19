// Copied from:
// https://github.com/jhipster/jhipster-sample-app/blob/master/src/main/webapp/app/shared/model/request-util.ts
import { HttpParams } from '@angular/common/http';

// tslint:disable
export const createRequestOption: (req?: any) => HttpParams = (req?: any):
HttpParams => {
    let options: HttpParams = new HttpParams();
    if (req) {
        Object.keys(req)
            .forEach((key: string) => {
            if (key !== 'sort') {
                options = options.set(key, req[key]);
            }
        });
        if (req.sort) {
            req.sort.forEach((val: string) => {
                options = options.append('sort', val);
            });
        }
    }
    return options;
};
