// tslint:disable:no-import-side-effect
import './vendor.ts';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppHomeMOdule } from './home';
import { AppEntityModule } from './entities/entity.module';
import {
    AppMainComponent,
    AppNavbarComponent,
    AppFooterComponent,
} from './layouts';

@NgModule({
    declarations: [
        AppMainComponent,
        AppNavbarComponent,
        AppFooterComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AppHomeMOdule,
        AppEntityModule
    ],
    providers: [
    ],
    bootstrap: [AppMainComponent]
})
export class AppModule { }
