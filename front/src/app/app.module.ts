import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IpponAppRoutingModule} from './app-routing.module';
import { IpponHomeModule } from './home';
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
} from './layouts';

@NgModule({
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        IpponAppRoutingModule,
        IpponHomeModule
    ],
    providers: [
    ],
    bootstrap: [JhiMainComponent]
})
export class AppModule { }
