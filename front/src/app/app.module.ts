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
    NavbarComponent,
    FooterComponent,
} from './core';

@NgModule({
    declarations: [
        AppMainComponent,
        NavbarComponent,
        FooterComponent
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
