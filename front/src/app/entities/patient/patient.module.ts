import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { PatientService } from './patient.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PatientComponent],
  providers: [PatientService]
})
export class PatientModule { }
