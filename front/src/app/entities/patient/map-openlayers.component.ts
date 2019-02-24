/* =============================================================================
  *         AUTHOR: JulioJu
  *         GITHUB: https://github.com/JulioJu
  *        LICENSE: MIT (https://opensource.org/licenses/MIT)
  *        CREATED: Thu 14 Feb 2019 11:25:40 AM CET
  *       MODIFIED: Sun 24 Feb 2019 05:42:17 PM CET
  *
  *          USAGE:
  *
  *    DESCRIPTION:
  * ============================================================================
  */

// tslint:disable:no-magic-numbers ban-ts-ignore no-unsafe-any

import { Component, OnInit, Input } from '@angular/core';

// @ts-ignore
import Feature from 'ol/Feature.js';
// @ts-ignore
import Geolocation from 'ol/Geolocation.js';
// @ts-ignore
import Map from 'ol/Map.js';
import { defaults as defaultControls, Attribution, FullScreen }
    // @ts-ignore
    from 'ol/control.js';
// @ts-ignore
import View from 'ol/View.js';
// @ts-ignore
import Polyline from 'ol/format/Polyline.js';
// @ts-ignore
import Point from 'ol/geom/Point.js';
// @ts-ignore
import * as proj from 'ol/proj.js';
// @ts-ignore
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
// @ts-ignore
import { OSM, Vector as VectorSource } from 'ol/source.js';
// @ts-ignore
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';

// import { URL_OSRM_CYCLIST } from '../../app.constants';

import { ShowError } from './../../shared';

// Check my question at
// https://github.com/openlayers/openlayers/issues/8448#issuecomment-464871327

class PointLongLat {
    public constructor(public longitude: number, public latitude: number) {}
    public toString(): string {
        return `${this.longitude},${this.latitude}`;
    }
}

interface IOSRMResponse {
    code: string;
    waypoints: Array<{location: number}>;
    routes: Array<{geometry: string}>;
}

const fetchDataFromOSRM =
        async (url: string): Promise<IOSRMResponse> => {
    let serverResponse: Response;
    const messageError = 'Fail to retieve route at url:' + url;
    try {
        console.debug(`Trying to fetch from: ${url}`);
        serverResponse = await fetch(url);
    } catch (e) {
        console.error(e);
        throw new Error(`${messageError} (details: ${e})`);
    }
    if (! serverResponse.ok && serverResponse.status !== 400) {
        console.error(serverResponse);
        throw new Error(messageError
         + ` (${serverResponse.status}: ${serverResponse.statusText})`);
    }
    // See http://project-osrm.org/docs/v5.5.1/api/
    const osrmResponse = await serverResponse.json() as IOSRMResponse;
    if (osrmResponse.code !== 'Ok') {
        console.error(osrmResponse);
        throw new Error(`Message from route server: `
            + `"${osrmResponse.code}" (url: ${url})`);
    }
    console.debug(osrmResponse);
    return osrmResponse;
};

const getPolylineRoute = async (...points: PointLongLat[]): Promise<string> => {
    const urlOSRMDriving =
        'http://localhost:5005/route/v1/driving/' + points.join(';')
        + '?overview=full';
    const osrmJSON = await fetchDataFromOSRM(urlOSRMDriving);
    return osrmJSON.routes[0].geometry;
};

// const getNearest4326Point = async (coord4326: PointLongLat):
//         Promise<PointLongLat> => {
//     const urlOSRMNearest =
//         `http://localhost:5005/nearest/v1/driving/${coord4326.toString()}`;
//     const osrmJSON = await fetchDataFromOSRM(urlOSRMNearest);
//     return new PointLongLat(osrmJSON.waypoints[0].location[0] as number,
//         osrmJSON.waypoints[0].location[1] as number);
// };

const createRoute = async (map: Map,
        ...points: PointLongLat[]): Promise<void> => {
    // Work without that!!!
    // https://stackoverflow.com/questions/40140149/use-async-await-with-array-map
    // const pointsParsedNearest = await Promise.all(points.map(
    //     getNearest4326Point));
    const polyline: string = await getPolylineRoute(...points);
    const route = (new Polyline({
        factor: 1e5
    })).readGeometry(polyline, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
    });
    const routeFeature = new Feature({
        type: 'route',
        geometry: route
    });
    const styles = {
        route: new Style({
            stroke: new Stroke({
                width: 6, color: [237, 212, 0, 0.8]
            })
        })
    };
    routeFeature.setStyle(styles.route);
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource
    });
    vectorSource.addFeature(routeFeature);
    map.addLayer(vectorLayer);

    // https://openlayers.org/en/latest/examples/center.html
    const view = map.getView();
    const point = routeFeature.getGeometry();
    view.fit(
        // @ts-ignore:2345
        point,
        {padding: [20, 20, 20, 20], minResolution: 50});
};

const createAPoint = (arrivalPointProj: number[], color: string):
        VectorLayer => {

    const arrivalPoint = new Feature();
    arrivalPoint.setStyle(new Style({
        image: new CircleStyle({
        radius: 6,
        fill: new Fill({
            color
        }),
        stroke: new Stroke({
            color: '#fff',
            width: 2
        })
        })
    }));
    arrivalPoint.setGeometry(new Point(arrivalPointProj));

    return new VectorLayer({
        source: new VectorSource({
            features: [arrivalPoint]
        })
    });
};

// TODO use ../../../assets/outdated-leaflet/getPositionsFreegeoip.js
// probably better
const geolocationFunction = (
        map: Map,
        view: View,
        arrivalPointProj: number[],
        pointLongLat: PointLongLat): void => {
    // https://openlayers.org/en/latest/examples/geolocation.html

    const geolocation = new Geolocation({
        // enableHighAccuracy must be set to true to have the heading value.
        // trackingOptions: {
        // enableHighAccuracy: true
        // },
        projection: view.getProjection()
    });
    // enable with true
    geolocation.setTracking(true);

    let positionAlreadyChanged = false;
    // When geolocation is allowed in the Browser,
    // this event is triggered often.
    geolocation.on('change:position', (): void => {
        const coordinates = geolocation.getPosition();
        if (!positionAlreadyChanged
            && coordinates
            && coordinates[0]
            && coordinates[1]) {
            map.addLayer(createAPoint(coordinates, 'red'));
            const extent =
                arrivalPointProj
                .concat(coordinates);
            view.fit(extent);
            positionAlreadyChanged = true;
            // view.setCenter(coordinates);
            createRoute(map,
                pointLongLat,
                // @ts-ignore
                new PointLongLat(...proj.toLonLat(coordinates)))
                .catch((e: Error) => ShowError(e.message));
        }
    });

    // handle geolocation error.
    geolocation.on('error', (error: Error) => {
        console.error(error);
        ShowError(error.message);
    });
};

// tslint:disable:max-classes-per-file
@Component({
    selector: 'app-map-openlayers',
    styleUrls: [
        './map.component.css'
    ],
    templateUrl: './map-openlayers.component.html'
})
export class MapOpenLayersComponent implements OnInit {

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

        // Point
        // ==========
        // Other objects needed to build a map

        const  arrivalPointProj = proj.fromLonLat([
            this.longitudeArrival,
            this.latitudeArrival
        ]);

        const attribution = new Attribution({
            collapsible: false
        });

        const view: View = new View({
            center: arrivalPointProj,
            zoom: 15
        });

        // Map
        // ==========
        const map = new Map({
            target: 'mapOSRM',
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                createAPoint(arrivalPointProj, '#3399CC')
            ],
            view,
            controls:
                defaultControls({attribution: false})
                    .extend([attribution, new FullScreen()])
            // loadTilesWhileAnimating: true
        });

        // Attributions resize
        // ==========
        // https://openlayers.org/en/latest/examples/attributions.html
        const mapSize = map.getSize();
        if (! mapSize) {
            return;
        }
        const checkSize = (): void => {
            const small = mapSize[0] < 600;
            attribution.setCollapsible(small);
            attribution.setCollapsed(small);
        };

        window.addEventListener('resize', checkSize);
        checkSize();

        // Geolocation
        // ==========
        geolocationFunction(map, view, arrivalPointProj,
            new PointLongLat(this.longitudeArrival, this.latitudeArrival));

    }

}
