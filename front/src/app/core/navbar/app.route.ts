import { Route } from '@angular/router';

import { AppNavbarComponent } from './navbar.component';

export const navbarRoute: Route = {
    path: '',
    component: AppNavbarComponent,
    outlet: 'navbar'
};
