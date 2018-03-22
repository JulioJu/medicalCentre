import { Route } from '@angular/router';

import { HomeComponent } from './home.component';
import { APPLICATION_NAME_PIPE } from '../app.constants';

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'Welcome!' + APPLICATION_NAME_PIPE
    }
};
