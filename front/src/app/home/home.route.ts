import { Route } from '@angular/router';

import { AppHomeComponent } from './home.component';
import { APPLICATION_NAME_PIPE } from '../app.constants';

export const HOME_ROUTE: Route = {
    path: '',
    component: AppHomeComponent,
    data: {
        authorities: [],
        pageTitle: APPLICATION_NAME_PIPE + 'Welcome!'
    }
};
