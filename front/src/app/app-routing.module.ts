import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { navbarRoute } from './core';
import { DEBUG_INFO_ENABLED } from './app.constants';

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
export class AppRoutingModule {}
