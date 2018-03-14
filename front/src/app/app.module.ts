import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule} from './app-routing.module';
import { HomeModule } from './home';
import { EntityModule } from './entities/entity.module';
import {
    MainComponent,
    NavbarComponent,
    FooterComponent,
} from './layouts';

@NgModule({
    declarations: [
        MainComponent,
        NavbarComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HomeModule,
        EntityModule
    ],
    providers: [
    ],
    bootstrap: [MainComponent]
})
export class AppModule { }
