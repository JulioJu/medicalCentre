import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, NavigationEnd, Event }
    from '@angular/router';
import { navbarRoute } from './core';
import { DEBUG_INFO_ENABLED } from './app.constants';

import {
    TriggerRemoveBanner
} from './shared';

const LAYOUT_ROUTES: Routes = [
    navbarRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES,
                { useHash: true , enableTracing: DEBUG_INFO_ENABLED })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

    public constructor(private readonly route: Router) {
        this.routeEvent(this.route);
    }

    public routeEvent = (router: Router): void => {
        router.events.subscribe((e: Event) => {
            if (e instanceof NavigationEnd) {
                TriggerRemoveBanner();
            }
        });
    }
}
