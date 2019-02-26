/* =============================================================================
  *         AUTHOR: JulioJu
  *         GITHUB: https://github.com/JulioJu
  *        LICENSE: MIT (https://opensource.org/licenses/MIT)
  *        CREATED: Thu 14 Feb 2019 11:25:40 AM CET
  *       MODIFIED: Tue 26 Feb 2019 09:04:58 PM CET
  *
  *          USAGE:
  *
  *    DESCRIPTION:
  * ============================================================================
  */

// tslint:disable:no-magic-numbers ban-ts-ignore no-unsafe-any interface-name
// tslint:disable:no-namespace switch-default

import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';

import * as OSRM from 'osrm';
// @ts-ignore
import * as OsrmTextInstructions from 'osrm-text-instructions';

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

// import { URL_OSRM_CYCLIST } from '../../../app.constants';

import { ShowError } from './../../../shared';

// Check my question at
// https://github.com/openlayers/openlayers/issues/8448#issuecomment-464871327

class PointLongLat {
    public constructor(public longitude: number, public latitude: number) {}
    public toString(): string {
        return `${this.longitude},${this.latitude}`;
    }
}

declare namespace OSRMLocal {
    type Response =
        // Request could be processed as expected.
        'Ok' |
        // URL string is invalid.
        'InvalidUrl' |
        // Service name is invalid.
        'InvalidService' |
        // Version is not found.
        'InvalidVersion' |
        // Options are invalid.
        'InvalidOptions' |
        // The query string is synctactically malformed.
        'InvalidQuery' |
        // The successfully parsed query parameters are invalid.
        'InvalidValue' |
        // One of the supplied input coordinates could not snap to street
        // segment.
        'NoSegment' |
        // The request size violates one of the service specific request size
        // restrictions.
        'TooBig' ;

    // Finds the fastest route between coordinates in the supplied order.
    interface RouteService {
        // if the request was successful Ok otherwise see the service dependent
        // and general status codes.  In case of error the following codes are
        // supported in addition to the general ones: NoRoute
        code: Response | 'NoRoute';
        // Array of Waypoint objects representing all waypoints in order:
        waypoints: OSRM.Waypoint[];
        // An array of Route objects, ordered by descending recommendation rank.
        routes: OSRM.Route[];
    }
}

const fetchDataFromOSRM =
        async (url: string): Promise<OSRMLocal.RouteService> => {
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
    const osrmResponse = await serverResponse.json() as OSRMLocal.RouteService;
    if (osrmResponse.code !== 'Ok') {
        console.error(osrmResponse);
        throw new Error(`Message from route server: `
            + `"${osrmResponse.code}" (url: ${url})`);
    }
    console.debug(osrmResponse);
    return osrmResponse;
};

// const getNearest4326Point = async (coord4326: PointLongLat):
//         Promise<PointLongLat> => {
//     const urlOSRMNearest =
//         `http://localhost:5005/nearest/v1/driving/${coord4326.toString()}`;
//     const osrmJSON = await fetchDataFromOSRM(urlOSRMNearest);
//     return new PointLongLat(osrmJSON.waypoints[0].location[0] as number,
//         osrmJSON.waypoints[0].location[1] as number);
// };

const drawPolyline = (polyline: string, map: Map): void => {
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
    // `view.fit' triggered a second time
    view.fit(
        // @ts-ignore:2345
        point,
        {padding: [20, 20, 20, 20], minResolution: 50});
};

// Inspired from
// https://github.com/perliedman/leaflet-routing-machine/blob/8b7a084edad5bc47851763f36872df986eea67aa/src/formatter.js#L105,L139
const getIconName = (instr: OSRM.StepManeuver): string => {
    switch (instr.type) {
        case 'depart':
            return 'depart';
            break;
        // case 'WaypointReached':
        //     return 'via';
        // case 'Roundabout':
        //     return 'enter-roundabout';
        case 'arrive':
            return 'arrive';
    }

    switch (instr.modifier) {
        case 'straight':
            return 'continue';
        case 'slight rigth':
            return 'bear-right';
        case 'right':
            return 'turn-right';
        case 'sharp right':
            return 'sharp-right';
        case 'uturn':
            return 'u-turn';
        case 'sharp left':
            return 'sharp-left';
        case 'left':
            return 'turn-left';
        case 'slight left':
            return 'bear-left';
    }
};

// Inspired from
// https://github.com/perliedman/leaflet-routing-machine/blob/8b7a084edad5bc47851763f36872df986eea67aa/src/formatter.js#L72,L90
const formatTime = (t: number /* Number (seconds) */): string => {
    // More than 30 seconds precision looks ridiculous
    const time = Math.round(t / 30) * 30;

    if (time > 86400) {
        return `${Math.round(time / 3600)} heures` ;
    } else if (time > 3600) {
        return `${Math.floor(time / 3600)} heures` +
            ` ${Math.round((time % 3600) / 60)} minutes`;
    } else if (time > 300) {
        return `${Math.round(time / 60)} minutes`;
    } else if (time > 60) {
        return `${Math.floor(time / 60)} minutes` +
            (time % 60 !== 0 ? ` ${(time % 60)} secondes` : '');
    } else {
        return `${time} secondes`;
    }
};

const formatDistance = (meters: number /* Number (meters) */): string => {
    if (meters >= 1000) {
        return `${Math.floor(meters / 1000)} km` +
            ` ${Math.round(meters % 1000)} mètres`;
    }
    return `${meters} mètres`;
};

const divAppendChildText = (div: HTMLElement,
    text: string,
    renderer: Renderer2
): void => {
    // const span = document.createElement('span');
    // const textNode = document.createTextNode(text);
    // span.appendChild(textNode);
    // div.appendChild(span);
    const span = renderer.createElement('span');
    const textNode = renderer.createText(text);
    renderer.appendChild(span, textNode);
    renderer.appendChild(div, span);
};

const createTextDirection = (legs: OSRM.RouteLeg[],
    map: Map,
    renderer: Renderer2,
    el: ElementRef
): void => {
    // const directionInstructions: HTMLDivElement =
    // document.createElement('div');
    const directionInstructions: HTMLDivElement = renderer.createElement('div');
    legs.forEach((leg: OSRM.RouteLeg) => {
        leg.steps.forEach((step: OSRM.RouteStep) => {
            // const img = document.createElement('span');
            // img.classList.add('leaflet-routing-icon');
            // img.classList
            //     .add(`leaflet-routing-icon-${getIconName(step.maneuver)}`);
            // directionInstructions.appendChild(img);
            const img = renderer.createElement('span');
            renderer.addClass(img, 'leaflet-routing-icon');
            renderer.addClass(img,
                `leaflet-routing-icon-${getIconName(step.maneuver)}`);
            renderer.appendChild(directionInstructions, img);

            divAppendChildText(directionInstructions,
                OsrmTextInstructions('v5')
                .compile('fr', step, {}),
                renderer
            );

            divAppendChildText(directionInstructions,
                formatTime(step.duration),
                renderer
            );

            divAppendChildText(directionInstructions,
                formatDistance(step.distance),
                renderer
            );
        });
    });

    // const mapDiv: HTMLElement = map.getTargetElement();
    // if (mapDiv.parentNode) {
    //     mapDiv.parentNode
    //         .insertBefore(directionInstructions, mapDiv.nextSibling);
    // }
    renderer.appendChild(el.nativeElement, directionInstructions);

};

const createRoute = async (map: Map,
        renderer: Renderer2,
        el: ElementRef,
        ...points: PointLongLat[]
): Promise<void> => {
    // Work without that!!!
    // https://stackoverflow.com/questions/40140149/use-async-await-with-array-map
    // const pointsParsedNearest = await Promise.all(points.map(
    //     getNearest4326Point));

    const urlOSRMDriving =
        'http://localhost:5005/route/v1/driving/' + points.join(';')
        + '?overview=full&steps=true';
    const osrmJSON = await fetchDataFromOSRM(urlOSRMDriving);

    // osrmJSON.routes[0].geometry !== osrmJSON.routes[0].legs[].geometry
    drawPolyline(osrmJSON.routes[0].geometry, map);

    createTextDirection(osrmJSON.routes[0].legs,
        map,
        renderer,
        el
    );

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

// TODO use ../../../../assets/getPositionsFreegeoip.js
// probably better
const geolocationFunction = (
        map: Map,
        view: View,
        arrivalPointProj: number[],
        pointLongLat: PointLongLat,
        renderer: Renderer2,
        el: ElementRef
): void => {
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
            // `view.fit' triggered a first time
            view.fit(extent);
            positionAlreadyChanged = true;
            // view.setCenter(coordinates);
            createRoute(map,
                renderer,
                el,
                pointLongLat,
                // @ts-ignore
                new PointLongLat(...proj.toLonLat(coordinates))
            )
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
    templateUrl: './map-openlayers.component.html',
    styleUrls: [
        'map.component.css',
        'map-openlayers.component.css'
    ]
})
export class MapOpenLayersComponent implements OnInit {

    @Input() protected latitudeArrival: number;
    @Input() protected longitudeArrival: number;

    public constructor(private renderer: Renderer2, private el: ElementRef) {}

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
        geolocationFunction(map,
            view,
            arrivalPointProj,
            new PointLongLat(this.longitudeArrival, this.latitudeArrival),
            this.renderer,
            this.el);

    }

}
