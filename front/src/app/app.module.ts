import { BrowserModule } from '@angular/platform-browser';
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
        AppRoutingModule,
        AppHomeMOdule,
        AppEntityModule
    ],
    providers: [
    ],
    bootstrap: [AppMainComponent]
})
export class AppModule { }
