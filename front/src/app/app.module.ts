import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PatientModule } from './entities/patient/patient.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        PatientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
