import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators }
    from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PatientService } from './patient.service';

import { AbstractDetailComponent } from '../abstract';

@Component({
    selector: 'app-patient-detail',
    templateUrl: './patient-detail.component.html'
})
export class PatientDetailComponent extends AbstractDetailComponent
        implements OnInit {

    protected readonly entityNameVar: string = 'patient';

    protected displayOpenlayersInsteadOfLeaflet: boolean = true;

    public formOpenLayerOrLeaflet: FormGroup = new FormGroup({
      // Could be ignore
      // https://github.com/palantir/tslint/issues/2651
      // tslint:disable-next-line:no-unbound-method
        leafletOrOpenLayers: new FormControl('openlayers', Validators.required)
    });

    public constructor(
                patientService: PatientService, route: ActivatedRoute) {
        super(patientService, route);
    }

    public leafletOrOpenLayers(event: Event): void {
      const input: AbstractControl | null =
        this.formOpenLayerOrLeaflet.get('leafletOrOpenLayers');
      if (input) {
          const value: string = input.value as string;
          if (value === 'openlayers') {
              this.displayOpenlayersInsteadOfLeaflet = true;
          } else if (value === 'leaflet') {
              this.displayOpenlayersInsteadOfLeaflet = false;
          }
      }
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

}
