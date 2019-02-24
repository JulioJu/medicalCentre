/* =============================================================================
  *         AUTHOR: JulioJu
  *         GITHUB: https://github.com/JulioJu
  *        LICENSE: MIT (https://opensource.org/licenses/MIT)
  *        CREATED: Thu 14 Feb 2019 11:25:40 AM CET
  *       MODIFIED: Sat 23 Feb 2019 10:44:20 AM CET
  *
  *          USAGE:
  *
  *    DESCRIPTION:
  * ============================================================================
  */

// TODO important, use OpenLayers, Leaflet is so bad !! Completly outdated
// written in es5, project no dynamic contrary to OpenLayers

// tslint:disable:prefer-function-over-method no-magic-numbers typedef
// tslint:disable:no-any ban-ts-ignore no-import-side-effect no-unsafe-any

import { Component, OnInit, Input } from '@angular/core';

import { URL_OSRM_CYCLIST } from '../../app.constants';

import * as L from 'leaflet';
// import 'leaflet-control-geocoder';
import 'leaflet-routing-machine';
import 'leaflet-fullscreen';

import { retrieveGeoLocalisation } from
'../../../assets/getPositionsFreegeoip.js';

import { ShowError } from './../../shared';

@Component({
    selector: 'app-map-leaflet',
    styleUrls: [
        './map.component.css'
    ],
    templateUrl: './map-leaflet.component.html'
})
export class MapLeafletComponent implements OnInit {

    @Input() protected latitudeArrival: number;
    @Input() protected longitudeArrival: number;

    public ngOnInit(): void {

        if (! this.latitudeArrival
            || this.latitudeArrival < -90
            || this.latitudeArrival > 90
            || ! this.longitudeArrival
            || this.longitudeArrival < -90
            || this.longitudeArrival > 90
        ) {
            ShowError('Destination should have latitude or'
                + ' longitude > 90 and < -90');
            return;
        }

        const map = L.map('mapOSRM');

        // map.setView([45.190725, 5.734501], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a'
            + ' href="https://www.openstreetmap.org/copyright">'
            + 'OpenStreetMap</a> contributors'
            + ' | Routes from <a href="http://project-osrm.org/">OSRM</a>,'
            + ' data uses <a href="http://opendatacommons.org/licenses/odbl/">'
            + 'ODbL</a> license'
        })
        .addTo(map);

        map.on('error', (e) => {
            ShowError(e.toString());
        });

        // Don't know if this event as a sens, probably it's an event of
        // a tile object
        map.on('tileerror', (e) => {
            ShowError(e.toString());
        });

        map.addControl(new (L.Control as any).Fullscreen());

        retrieveGeoLocalisation()
        .then((coordinateStart) => {
            L.Routing.control({
                // @ts-ignore
                serviceUrl: URL_OSRM_CYCLIST,
                defaultErrorHandler: (e: any) => {
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
                    L.latLng([this.latitudeArrival, this.longitudeArrival])
                ],
                routeWhileDragging: true
            })
            .addTo(map);
        })
        .catch((e): void => {
            console.error(e);
            ShowError(e.toString());
        });

        // routingControl.on('routingerror', (e: Error) => {
        //     alert(e.toString());
        // });
    }

}
