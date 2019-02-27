/* =============================================================================
  *         AUTHOR: JulioJu
  *         GITHUB: https://github.com/JulioJu
  *        LICENSE: MIT (https://opensource.org/licenses/MIT)
  *        CREATED: Thu 14 Feb 2019 11:25:40 AM CET
  *       MODIFIED: Wed 27 Feb 2019 04:10:40 PM CET
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
import { extend } from 'ol/extent.js';
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

import {
    URL_OSRM_CYCLIST ,
    URL_OSRM_WALKER,
    URL_OSRM_DRIVER
} from '../../../app.constants';

import { ShowError, CatchAndDisplayError } from './../../../shared';

interface IProfil {
    title: string;
    colorRGB: number[];
    url: string;
    extent?: number[];
}

interface IElements {
    map: Map;
    el: ElementRef;
    renderer: Renderer2;
}

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

const drawPolyline =
(polyline: string, map: Map, profil: IProfil): void => {
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
                width: 6, color: profil.colorRGB.concat(0.8)
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

    profil.extent = vectorSource.getExtent();
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

const appendChildText = (htmlElement: HTMLElement,
    text: string,
    renderer: Renderer2,
    tag?: string
): void => {
    // const span = document.createElement('span');
    // const textNode = document.createTextNode(text);
    // span.appendChild(textNode);
    // htmlElement.appendChild(span);
    const tagToAppend = tag ? tag : 'span';
    const span = renderer.createElement(tagToAppend);
    const textNode = renderer.createText(text);
    renderer.appendChild(span, textNode);
    renderer.appendChild(htmlElement, span);
};

const createTextDirection = (elements: IElements, legs: OSRM.RouteLeg[],
    profil: IProfil
): void => {

    const directionInfo: HTMLDivElement =
        elements.renderer.createElement('div');
    directionInfo.style.backgroundColor =
        `rgba(${profil.colorRGB.concat(0.2)})`;
    appendChildText(directionInfo, profil.title, elements.renderer, 'h4');

    const directionInstructions: HTMLDivElement =
        elements.renderer.createElement('div');
    legs.forEach((leg: OSRM.RouteLeg) => {
        leg.steps.forEach((step: OSRM.RouteStep) => {

            const directionSpan = elements.renderer.createElement('span');
            const directionImg = elements.renderer.createElement('span');
            elements.renderer.addClass(directionImg, 'leaflet-routing-icon');
            elements.renderer.addClass(directionImg,
                `leaflet-routing-icon-${getIconName(step.maneuver)}`);
            elements.renderer.appendChild(directionSpan, directionImg);
            appendChildText(directionSpan,
                OsrmTextInstructions('v5')
                .compile('fr', step, {}),
                elements.renderer
            );
            elements.renderer.appendChild(directionInstructions, directionSpan);

            appendChildText(directionInstructions,
                formatTime(step.duration),
                elements.renderer
            );

            appendChildText(directionInstructions,
                formatDistance(step.distance),
                elements.renderer
            );
        });
    });

    elements.renderer.appendChild(directionInfo, directionInstructions);
    elements.renderer.appendChild(elements.el.nativeElement, directionInfo);

};

const createRoute = async (map: Map,
    profil: IProfil
): Promise<OSRMLocal.RouteService> => {
    // Work without that!!!
    // https://stackoverflow.com/questions/40140149/use-async-await-with-array-map
    // const pointsParsedNearest = await Promise.all(points.map(
    //     getNearest4326Point));

    const osrmJSON = await fetchDataFromOSRM(profil.url);

    // osrmJSON.routes[0].geometry !== osrmJSON.routes[0].legs[].geometry
    drawPolyline(osrmJSON.routes[0].geometry, map, profil);

    return osrmJSON;
};

/**
 * Async functions
 *
 */
const createRoutes = async (
        elements: IElements,
        pointDeparture: PointLongLat,
        pointArrival: PointLongLat
): Promise<void> => {
    const urlEnd = `/${pointDeparture};${pointArrival}`
        + '?overview=full&steps=true';

    const cyclist: IProfil = {
        title: 'Vélo (c\'est très bien)',
        colorRGB: [0, 255, 0],
        url: `${URL_OSRM_CYCLIST}${urlEnd}`
    };

    const walker: IProfil = {
        title: 'Marcheur (c\'est bien)',
        colorRGB: [0, 0, 255],
        url: `${URL_OSRM_WALKER}${urlEnd}`
    };

    const driver: IProfil = {
        title: 'Conducteur (c\'est mal)',
        colorRGB: [255, 0, 0],
        url: `${URL_OSRM_DRIVER}${urlEnd}`
    };

    const profils = [cyclist, walker, driver];

    const osrmJSONArray = await Promise.all(
        profils.map((profil: IProfil): Promise<OSRMLocal.RouteService> =>
            createRoute(elements.map, profil)
        )
    );

    const view = elements.map.getView();

    let newExtent = view.calculateExtent();
    for (let index = 0 ; index < profils.length ; index++) {
        if (profils[index].extent) {
            // https://stackoverflow.com/questions/49746970/openlayers-4-fit-to-extent-of-selected-features
            newExtent = extend(newExtent, profils[index].extent as number[]);
            createTextDirection(
                elements,
                osrmJSONArray[index].routes[0].legs,
                profils[index]
            );
        }
    }

    // https://openlayers.org/en/latest/examples/center.html
    view.fit(
        newExtent,
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

// TODO use ../../../../assets/getPositionsFreegeoip.js
// probably better
const geolocationFunction = (
        elements: IElements,
        arrivalPointProj: number[],
        pointLongLat: PointLongLat
): void => {
    // https://openlayers.org/en/latest/examples/geolocation.html

    const geolocation = new Geolocation({
        // enableHighAccuracy must be set to true to have the heading value.
        // trackingOptions: {
        // enableHighAccuracy: true
        // },
        projection: elements.map.getView()
            .getProjection()
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
            elements.map.addLayer(createAPoint(coordinates, 'red'));
            const extent =
                arrivalPointProj
                .concat(coordinates);
            positionAlreadyChanged = true;
            // view.setCenter(coordinates);
            createRoutes(elements,
                pointLongLat,
                // @ts-ignore
                new PointLongLat(...proj.toLonLat(coordinates))
            )
            .catch((e: Error): void => {
                console.error(e);
                CatchAndDisplayError(e);
                elements.map.getView()
                    .fit(extent);
            });
        }
    });

    // handle geolocation error.
    geolocation.on('error',
        (e: Error): void => {
            console.error(e);
            CatchAndDisplayError(e);
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
            ShowError(new Error('Destination should have latitude or'
                + ' longitude > 90 and < -90'));
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
        geolocationFunction(
            { map, el: this.el, renderer: this.renderer},
            arrivalPointProj,
            new PointLongLat(this.longitudeArrival, this.latitudeArrival)
        );

    }

}
