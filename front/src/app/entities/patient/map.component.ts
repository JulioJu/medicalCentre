/* =============================================================================
  *         AUTHOR: JulioJu
  *         GITHUB: https://github.com/JulioJu
  *        LICENSE: MIT (https://opensource.org/licenses/MIT)
  *        CREATED: Thu 14 Feb 2019 11:25:40 AM CET
j *       MODIFIED: Fri 15 Feb 2019 12:42:44 AM CET
  *
  *          USAGE:
  *
  *    DESCRIPTION:
  * ============================================================================
  */

import { Component, OnInit } from '@angular/core';

import { URL_OSRM_CYCLIST } from '../../app.constants';

import * as L from 'leaflet';
// tslint:disable:no-import-side-effect
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine';
import 'leaflet-fullscreen';

import { retrieveGeoLocalisation } from
'../../../assets/getPositionsFreegeoip.js';

import { ShowError } from './../../shared';

// tslint:disable-next-line:no-magic-numbers
export const OSRMProfil = { cyclist: 0,  walker: 1, driver: 2};

@Component({
    selector: 'app-map',
    styleUrls: [
        './map.component.css'
    ],
    templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
    // tslint:disable-next-line:prefer-function-over-method
    public ngOnInit(): void {

        const map = L.map('mapOSRM');

        // map.setView([45.190725, 5.734501], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a'
            + 'href="https://www.openstreetmap.org/copyright">'
            + 'OpenStreetMap</a> contributors'
        })
        .addTo(map);

        // tslint:disable

        map.on('error', (e) => {
            ShowError(e.toString());
        })

        // Don't know if this event as a sens, probably it's an event of
        // a tile object
        map.on('tileerror', (e) => {
            ShowError(e.toString());
        })

        map.addControl(new (L.Control as any).Fullscreen());

        retrieveGeoLocalisation()
        .then((coordinateStart) => {
            L.Routing.control({
                // @ts-ignore
                serviceUrl: URL_OSRM_CYCLIST,
                defaultErrorHandler: function(e: any) {
                    console.error(e);
                    if (e.error.url) {
                        ShowError(`Can't display map as there is error with ` +
                        `${e.error.url}`);
                    } else {
                        ShowError(e.message);
                    }
                },
                waypoints: [
                    L.latLng(coordinateStart),
                    L.latLng([45.190725, 5.734501])
                ]
            })
            .addTo(map);
        }).catch((e): void => {
            console.error(e);
            ShowError(e.toString());
        });
        // tslint:enable

        // routingControl.on('routingerror', (e: Error) => {
        //     alert(e.toString());
        // });
    }

}
