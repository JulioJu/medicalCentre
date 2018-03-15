import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { APPLICATION_NAME } from '../../app.constants';

import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html'
})
export class AppMainComponent implements OnInit {

    constructor(
        private readonly titleService: Title,
        private readonly router: Router
    ) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
        let title: string =
            (routeSnapshot.data && routeSnapshot.data.pageTitle)
                ?  routeSnapshot.data.pageTitle
                : APPLICATION_NAME;
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.titleService
                    .setTitle(this.getPageTitle
                        (this.router.routerState.snapshot.root));
            }
        });
    }
}
