« Cabinet medical » project.

<!-- vim-markdown-toc GFM -->

* [Back-end](#back-end)
    * [How to delete too much database record](#how-to-delete-too-much-database-record)
    * [Important note](#important-note)
    * [How to build and start OSRM server](#how-to-build-and-start-osrm-server)
* [Front-end](#front-end)
    * [Routes](#routes)
    * [Rest API for PUT an entity](#rest-api-for-put-an-entity)
    * [Create a service with Angular-cli](#create-a-service-with-angular-cli)
* [Observables](#observables)
* [Slippy Map](#slippy-map)
    * [OpenStreetMap solutions](#openstreetmap-solutions)
    * [How use Leaflet in an Angular app](#how-use-leaflet-in-an-angular-app)
        * [Leaflet fullscreen](#leaflet-fullscreen)
        * [DON'T USE LEAFLET, USE OPENLAYERS](#dont-use-leaflet-use-openlayers)
    * [OSRM and leaflet-routing-machine](#osrm-and-leaflet-routing-machine)
    * [See also iframe with metromobilite (for updated traffic info in Grenoble)](#see-also-iframe-with-metromobilite-for-updated-traffic-info-in-grenoble)
    * [Geocoder](#geocoder)
    * [Get current location](#get-current-location)
        * [Note: XMLHttpRequest is deprecated](#note-xmlhttprequest-is-deprecated)
        * [Note about my Standalone example](#note-about-my-standalone-example)
* [TODO](#todo)
    * [Secondary TODO](#secondary-todo)
    * [Principal TODO](#principal-todo)
* [Notes for developers](#notes-for-developers)
* [Linting](#linting)
* [Issues and PR opened by me for this project:](#issues-and-pr-opened-by-me-for-this-project)
* [Update](#update)
* [Credit](#credit)

<!-- vim-markdown-toc -->

# Back-end
* See folder [./back](./back). Built with Typescript and Express.
* See README written by me in [./back/README.md](./back/README.md).
* It serves at http://localhost:8080/ or at https://localhost:8433/.

## How to delete too much database record

Use `./deleteTooMuchDatabaseRecord.sh`

## Important note

* For HTTP PUT We don't test if there is too much POST params sent
    (as in ASP.NET CORE)

## How to build and start OSRM server
* See: [OSRM and leaflet-routing-machine](#osrm-and-leaflet-routing-machine)

# Front-end
* See folder [./front](./front). Built with Angular.
* Folder tree and routing is a little bit inspired from JHipster 4.14.0.
    I've also improved JHipster thanks this current project
    (see https://github.com/jhipster/generator-jhipster/pull/7311).
* In dev mode, it serves at http://localhost:4200/.

## Routes
* Routes described in [./back/README.md#Routes](./back/README.md#Routes) work
    thanks proxy [./front/proxy.conf.json](./front/proxy.conf.json).
* `/#/patients` : GET all patients.
* `/#/nurses` : GET all nurses.
* `/#/patient/:id` : GET patient with id ":id"
* `/#/nurse/:id` : GET nurse with id ":id"
* Deletions:
    * Parameters:
        * `:id` is mandatory.
        * `confirmation` and `stateDeletion` are matrix parameters,
            (therefore optionals).
        * `stateDeletion` could have value:
            * "notTried"(display button to delete in the page)
            * "deleted" (button to delete not displayed)
            * "error" (display error message, button to delete not displayed)
            * Default "notTried".
        * `confirmation` could have value "true" or "false". If true, delete
            immediately. Default: false.
    * Routes:
        * `/#/patient-delete/:id;confirmation=boolean:stateDeletion=string;` :
            delete patient with id ":id"
        * `/#/nurse-delete/:id;confirmation=boolean:stateDeletion=string;` :
            delete nurse with id ":id"
* `/#/patient-form-proto` : create a new patient (just for a form prototype, do
    nothing)
* `/#/patient-form` : create a new patient
* `/#/nurse-form` : create a new nurse
* `/#/patient-form/:id` : PUT (edit) patient with id ":id"
* `/#/nurse-form/:id` : PUT (edit) nurse with id ":id"
* `/#/` : home page.

N.B. Form fields are cached in SessionStorage to prevent the loss of data
    during navigation or page reload without submit.
    It's the default behaviour in Firefox for a simple HTML form (not Angular).
    For fields with value non empty, Angular Validation is performed.

## Rest API for PUT an entity

* Bare Mongo Client or Mongoose send
    * MongoError
        * If HTTP Code 400
            * error.code === 11000 means it's there is an DuplicateKey error
                * See also how to manipulate it
                    * https://github.com/Automattic/mongoose/issues/2129
                    * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/510f81374c99b2b985400faa92af10444c3b8127/types/mongodb/index.d.ts#L212,L228
                    * https://github.com/matteodelabre/mongoose-beautiful-unique-validation
                        * Not very maintained
                    * Note: when there are several unique duplicated values
                        in a document, the error message 11000 give a message.
                        only for only one. It's a very very very bad thing.
                    * Big warning, my Regex to extract is:
                        `/index:\s(_?[a-z0-9]+).*"/i`
                        It matches alphanumerics key that
                        could also optionally is leading by an underscore.
                        Big big warning: doesn't match Unicode key.
        * If HTTP Code 502: error that is not Validation Error
            (mongo server shutdown for instance)
    * IAbstract
    * DeleteWriteOpResultObject['result']
    * FindAndModifyWriteOpResultObject
    * ValidationError (only for mongoose) with HTTP Code 400
        https://mongoosejs.com/docs/api.html#Error
        * See also https://mongoosejs.com/docs/validation.html
        * See also errors types
        * Handle in Angular form
    * ~~CastError (only for mongoose) with HTTP Code 400
        * Note: could be have only one CastError per result (I've tested)~~
        * use option `multipleCastError` that send `ValidationError`
    * Custom object with ``{ e.error_message_origin: 'back'}`` with HTTP error 400
        * Only for mongonative error, check only mandatory parameters.
        * Not very well idea, should use Mongodb Schema instead,
            but Mongoose Validation is more powerful,
            more capabilities and definitions are more clear.
        * Not handle in Angular Front
    * => See also
        * ./back/app/entities/abstract/abstract.mongonative.service.ts
        * ./back/app/entities/abstract/abstract.mongoose.service.ts
        * ./back/app/entities/abstract/abstract.route.ts


* On the Angular Client, this errors are properly displayed for each field
    and on the top of the form.
    * To test it, in `submit` button remove attribute 'disabled' thanks inspector
    tool in Firefox and enjoy ;-).
    * When we navigate, the red banner displayed at the front of the page is
    removed of the page

## Create a service with Angular-cli
* To create a new module with its service and component. With Angular-cli
    1. `cd src/app/`
    2. `ng generate module ./entities/patient`
    3. `ng generate component ./entities/patient --module ./entities/patient/patient.module.ts`
    4. `ng generate service ./entities/patient/patient  --module ./entities/patient/patient.module.ts`

# Observables
* I've wrote a good example to understand Observer and Observable with RxJS.
    See [./back/app/ObserverTests.ts](./back/app/ObserverTests.ts)
    * Be careful, Observer and Observable with RxJS havn't the same design
        pattern as in JAVA:
        (https://docs.oracle.com/javase/9/docs/api/java/util/Observable.html vs
        http://reactivex.io/rxjs/manual/overview.html#observables-as-generalizations-of-functions)
    * Therefore Observable differs of EventEmitter
* When unsubscribe?
    * See: https://github.com/angular/angular/issues/22410

# Slippy Map

* Definition: https://wiki.openstreetmap.org/wiki/Slippy_map

* Actually, Google Map needs to create an API Key to use its service, even
    if it's free
    " If you’re just serving users a simple map with a marker, say to show
    your office location, you’ll continue to pay nothing under the new system.
    However, if you use the Embed API in Directions, Views or Search mode, you
    will be eligible for billing.* "
    See https://manifesto.co.uk/google-maps-api-pricing-changes/
    for the current princing model of google.
    * Before it was free for less than 50 000 requests. We see limitation of
        using a proprietary solution (as for Java JDK, contrary to OpenJDK).

* Using Google API is not a good idea because Route Calculation are
    not free, see https://cloud.google.com/maps-platform/pricing/sheet/
    Before summer 2018, it was free: see
    https://developers.google.com/maps/previous-pricing

* Viamichelin API are not free too : see https://api.viamichelin.com/

* The teacher advise to use https://angular-maps.com/
    but there is the limitation that we must be registred on Google (API Keys)
    + we can't calculate routes for free.

* There is https://www.targomo.com/developers/services/routing
    it's seems so cool ! Seems to be very powerful . Calculate route with
    tram or others. Free until 300 request per month. Could be
    easy integrated thanks https://github.com/targomo/targomo-js
    (written in TypeScript)

## OpenStreetMap solutions

* OpenStreetMap
    See https://wiki.openstreetmap.org/wiki/Frameworks#Displaying_interactive_maps
    for all solutions.
    * Not that I've heard speak often of Leaflet.
    * Open Street Map could also use Google API: see
        https://wiki.openstreetmap.org/wiki/Google_Maps_Example
        They advise Leaflet as an alternative.

* Solution for routing seems to use OSRM a "Modern C++ routing engine for
    shortest paths in road networks."
    "Supports car, bicycle, walk modes; easily customized through profiles."
    http://project-osrm.org/
    There is a package for ArchLinux.
    * I've seen two JavaScript clients:
        1. http://www.liedman.net/leaflet-routing-machine/
            Integrate lot of API (OSRM, TomTom, Mapbox, GraphHopper, etc.)
            More commits than bellow.
            * There are definition for Leaflet routing machine.
            * Same limitation as below.
            * They advise GeoCoder for addresses.
                See http://www.liedman.net/leaflet-routing-machine/tutorials/geocoders/
        2. https://github.com/wwwouaiebe/leaflet.TravelNotes
            As wwwouiabe said "Warning : This demo uses OSRM demo server. (…).
            Due to heavy traffic on this server, you can frequently receive an
            http error 429.  If you have a Mapbox or GraphHopper API key, you
            can also use this (…) And with Mapbox and GraphHopper, you can
            search a route for car, bike or pedestrian.
            User guide in English or French.
    * Note Mapbox API key is actually free until
        "50,000 Directions requests / mo"
        See https://www.mapbox.com/pricing/
    * Note, as said above, using a demo server is not very usable
        even for a demo to the teacher. I've experienced lot of access denied.
        Therefore as I've said, I've build my own OSRM.

* Note: StackOverflow trends says that Leaflet is more used that OpenLayers
    https://www.metromobilite.fr/iti.html?lonlatDep=45.149,5.709965&lonlatArr=45.15857,5.70924

* TODO IMPORTANT, USE OPENLAYERS, LEAFLET IS SO BAD !! COMPLETLY OUTDATED
    WRITTEN IN ES5, PROJECT NO DYNAMIC CONTRARY TO OPENLAYERS
    OPENLAYERS IS THE SOLUTION

## How use Leaflet in an Angular app

* There are lot of built-in Angular solution, for instance:
    * https://github.com/Asymmetrik/ngx-leaflet
    * https://github.com/yagajs/leaflet-ng2 ()
    * But probably there is no interest to be dependent of this library.
        Mains problems are if the library dead, or issues added with this
        new layer. Furthermore, I don't know performance of that.

* I use directly Leaflet native library, imported in the folder node_modules.
    The main problem is with the css files in node_modules couldn't be linked
    in the app. We could add it in the `angular.json`, but very bad
    as the big library will be loaded in all pages of the app.

* There are webpack solutions, but bad idea as we add a layer
    * See https://github.com/Leaflet/Leaflet/issues/4849
    * https://github.com/ghybs/leaflet-defaulticon-compatibility
        (a library that done that for Leaflet)
    * https://github.com/webpack-contrib/css-loader/issues/253
        (probably the more general answer)
    * Very cool explanation:
        https://medium.com/making-internets/better-css-with-javascript-88463deecf3

* The easier, reliable and extensible solution is simply to create a
    symlink
    * Either in the `assets` folder like it:.
        ```sh
        ln -s ../../node_modules/leaflet/dist leaflet
        ```
        * Then in map.component.html, add
        ```html
        <link rel="stylesheet" type="text/css" href="/assets/leaflet/leaflet.css">
        ```
        * But never minified
        * Note: *the stylesheet link type is body-ok, and therefore <link
        rel="stylesheet"> is permitted in the body*
        https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
        * As it all plugins of Leaflet could be easy added ;-)
        * If in the stylesheet there is `body { background-color: red ;}`
            the background become red only if the component is loaded !!
            ***Nothing is stored globally !!!!!!***
        * But nothing is minified in dev.
    * Following is not a solution:
        1. create a symlink to the css file in the component's folder
        1. Then in the component
        ```javascript
        @Component({
            styleUrls: [ './node_modules/openlayers/ol.css' ],
            // See https://medium.com/google-developer-experts/angular-advanced-styling-guide-v4-f0765616e635
            encapsulation: ViewEncapsulation.None
        })
        ```
        * Styles are stored globally!!!
    * Following is not a cool solution:
        simply we could also change angular.json, without make symlink.
        https://github.com/angular/angular-cli/wiki/stories-global-styles
        * Styles are stored globally!!!
    * Important note : don't use `@import` in css file (it prevents parallel
        download)
    * Probably the best solution is to use Native Shadow Dom, but implemented
        from version 63 of Firefox.
* There are several ways to import `leaflet`.
    * A cool solution could be:
        ```typescript
            import 'leaflet';
            import 'leaflet-fullscreen';
            const L = window['L'];
        ```
        (found at https://github.com/Leaflet/Leaflet.markercluster/issues/874#issuecomment-404605516)
    * We could also use more common es6 like:
        https://github.com/Leaflet/Leaflet/issues/3229
    * Or use this solution found https://github.com/StratoDem/SDLeafletDraw
        ```typescript
            import * as L from 'leaflet';
            // tslint:disable-next-line:no-import-side-effect
            import 'leaflet-fullscreen';

        ```

* I've tested event `tilerror` and `map.on('error)`, when there the tile is
    not found (e.g. no network) it isn't fire.
    Maybe test https://github.com/ghybs/Leaflet.TileLayer.Fallback

### Leaflet fullscreen

* Warning, the plugin `leaflet-fullscreen` by `mapbox` has an npm version
    completely outdated. Build your own one.
    * Tickets are not answered.
    * More starts that below
    * See also https://github.com/Leaflet/Leaflet.fullscreen
    * In package.json I've simply added:
        ```json
        "leaflet-fullscreen": "git://github.com/Leaflet/Leaflet.fullscreen",
        ```
        and all work perfectly!! I've tested!!
* There is a powerful alternative, `leaflet.fullscreen`, but the maintainer seems
    not be maintained anymbore.
    https://github.com/brunob/leaflet.fullscreen

### DON'T USE LEAFLET, USE OPENLAYERS

* TODO IMPORTANT, USE OPENLAYERS, LEAFLET IS SO BAD !! COMPLETLY OUTDATED
    WRITTEN IN ES5, PROJECT NO DYNAMIC CONTRARY TO OPENLAYERS
    OPENLAYERS IS THE SOLUTION


## OSRM and leaflet-routing-machine

* To build OSRM see https://github.com/Project-OSRM/osrm-backend/wiki/Running-OSRM
    * Important: see also https://github.com/Project-OSRM/osrm-backend/issues/4736
        "host multiple profiles in same backend server."
        * To generate script, use the script that I've written:
            It will build osrm files under folder `../osrm`
            ```sh
            ./ScriptGenerateOSRMFiles.sh # Execute it to show help.
            ```
        * To launch servers of corresponding`../osrm/*/.osrm`files
            ```sh
            ./ScriptStartOSRM
            ```
            * Actually, on port:
                * 5005 there is osrm profile bicycle
                * 5006 there is osrm profile foot
                * 5007 there is osrm profile car

* See also https://github.com/perliedman/leaflet-routing-machine/issues/109

* TODO As Liedman said, don't use unpkg CDN for production use.

## See also iframe with metromobilite (for updated traffic info in Grenoble)

* An interesting solution is to embedded the metromobilite iframe:
    ```html
    <!-- or `velo=true`, or `voiture=true' or `tc=true', can't be the third  -->
    <!-- We can't inject script du to cross-domain rules -->
    <!-- https://stackoverflow.com/questions/16194398/inject-a-javascript-function-into-an-iframe -->
    <iframe src="https://www.metromobilite.fr/iti.html?dep=truc&arr=machin&lonlatDep=45.149,5.709965&lonlatArr=45.15857,5.70924&iFrame=true&tc=true" frameborder="0" width="100%" height="800"></iframe>
    ```
    Copyright: GNU Affero General Public License
    Contributors:
    NB/VT - sully-group - www.sully-group.fr - initialisation and implementation
    See https://www.metromobilite.fr/# (in developers tools) for more infos.
    * Website  https://www.tag.fr/7-itineraire.htm use something an iframe !
        I've discovered this utilisation thanks it ;-).
    * We could use REST API to use it ;-). So cool.
        Like it:
        https://www.metromobilite.fr/iti.html?lonlatDep=45.149,5.709965&lonlatArr=45.15857,5.70924
    * Interesting Note: use OpenLayers and not Leaflet
    * See also https://www.metromobilite.fr/pages/opendata/OpenDataApi.html#

    * To investigate the page, use `wget -p -k https://www.metromobilite.fr/iti.html`
        Do not download with Chromium or Firefox, as they don't download font,
        and it breaks the webpage.

    * Sadly, we can't inject script to change display cause of cross-domain
        rules. Therefore actually the better solution is to patch the app
        and server its own version of the app. License permit that.

    * I've sent a mail with the contact form under page opendata. I asked to
        add modes:

        > Objet: Documentation et amélioration de la page iti.html

        > Bonjour,
        >
        > J'ai regardé un peu comment était construit votre page https://www.metromobilite.fr/js/iti.js
        >
        > Sur la page, https://www.metromobilite.fr/pages/opendata/OpenDataApi.html#, je me disais qu'il serait intéressant de documenter un peu les paramètres GET, notamment les paramètres dep, arr, lonlatDep, lonlatArr, iFrame, tc, velo et voiture. Ainsi les usagers de TAG pourraient très facilement se créer des raccourcis internet sans avoir à créer d'espace perso !
        >
        > De plus, peut-être que dans la function initForm() il serait intéressant de créer un paramètre `all` qui sélectionnerait tous les paramètres, ainsi qu'un paramètre `covoiturage` qui sélectionnerait uniquement le covoiturage, et un paramètre `doux` qui sélectionnerait le vélo, piéton  et tc. Ainsi dés dès le chargement de la page s'afficherait les modes que l'on désire. J'ai testé, ça marche bien. Dans ce cas il faudrait également modifier js/outils.js .
        >
        > Qu'en pensez-vous ?
        >
        > Si je peux aider, n'hésitez pas.
        >
        > Bien cordialement,
        >
        > Julio Prayer (https://github.com/JulioJu)


## Geocoder

* https://github.com/smeijer/leaflet-geosearch
    Leaflet geosearching/geocoding control
    Actually 452 stars

* https://github.com/perliedman/leaflet-control-geocoder
    A simple geocoder form to locate places. Easily extended to multiple data providers.
    http://www.liedman.net/leaflet-control-geocoder/
    Actually 258 stars
    Same author that leaflet-routing-machine (used above)

* To have autocompletion, we must build our own Nominatim server or pay
    a service or get an API key. Actually, simply press enter to search.

* I use https://nominatim.openstreetmap.org/ , but it's not very powerful
    contrary to Google or Bing
    . If the address doesn't match exactly, found
    nothing or wrong result.
    For instance, type 'République Grenoble France' give nothing.
    * The 01/31/2019, during some minutes nominatim didn't work.

* At https://www.bing.com/maps we could obtain very easy longitude and latitude
    of a point. In the contextual menu (right-click).

* In Google Map Website we could retrieve coordinate but less easy, contrary to
    bing. Simply right-click to a pin => `what's here` then click to coordinate
    in the popup windows tha appears. On the left pan that appears, you could
    see decimal coordinates. Same if you drop a pin.

* The best one is Google Earth. Probably advise to the Secratary to use an
    other service than Nominatim. In Google Earth simply use `ctrl + shift v`
    See also https://support.google.com/earth/answer/148068?hl=en
    https://productforums.google.com/forum/#!topic/earth/csRTq684l4c

## Get current location

* https://github.com/jakubdostal/leaflet-geoip
    ~~GeoIP Plugin for Leaflet.js
    GeoIP Plugin for Leaflet.js. This plugin allows you to find the approximate
    position of the client machine based on their IP address. Additionally, you
    can center the map on this location.~~
    * ~~See simply
        https://github.com/jakubdostal/leaflet-geoip/blob/master/leaflet-geoip.js
        and transforme it to promise like
        https://stackoverflow.com/questions/48969495/in-javascript-how-do-i-should-i-use-async-await-with-xmlhttprequest~~
     https://freegeoip.net/json is Deprecated
    * Some solutions https://github.com/jakubdostal/leaflet-geoip/issues/7
        * https://freegeoip.app/json/ (no need API keys). You
            could build your own server: https://github.com/apilayer/freegeoip/
            Written in Go. **Exactly the same result than Google** !

* As for Direction, Neominatim has limitation for use in prod, but
    installation on a Server is very, very, very, very fat.
    * But we could use Google or other, maybe for free, but we must have API
        key.
    * There is https://ipinfo.io/pricing free under 1000 request a day, but we
        must obtain an API key.
    * Found thanks: https://www.iplocation.net/

* There is also HTML5 API, with Google Map
    https://www.google.com/maps/d/u/0/viewer?ie=UTF8&hl=en&msa=0&ll=27.760949999999994,-97.11523499999998&spn=34.668997,78.662109&z=4&mid=10Dg861xJNy18dTvB6dHk9fp8dRQ

* The solution is https://medium.com/@adeyinkaadegbenro/how-to-detect-the-location-of-your-websites-visitor-using-javascript-92f9e91c095f
    * You could also use https://freegeoip.app/json/ if you want
        ask permission to geolocate (see above). But I don't like.
        (also needed for IE 10 or opera mini)
    * For Geolocalisation, Firefox uses Google services
        https://www.reddit.com/r/waterfox/comments/8oief0/waterfox_5620_geolocation_not_working/
        Could be changed to put in `about:config`, under key `geo.wifi.uri`:
        `https://location.services.mozilla.com/v1/geolocate?key=%MOZILLA_API_KEY%`

* Tested, but google geolocalisation is very very bad (tested on Chromium too)
    (it use https://www.googleapis.com/geolocation/v1/geolocate?key=%GOOGLE_API_KEY%)
       * https://location.services.mozilla.com/v1/geolocate?key=%MOZILLA_API_KEY%
            is a little bit better.
            See also https://support.google.com/maps/answer/2839911?co=GENIE.Platform=Desktop&hl=en

* Probably, could be good for mobile phone, or change to an IP fixe :-) !!.

### Note: XMLHttpRequest is deprecated

When I run ./deprecatedXMLHttpRequest.ts (compiled thanks `tsc -t es2017`) I have:
```
Synchronous XMLHttpRequest on the main thread is deprecated because of its
detrimental effects to the end user’s experience. For more help
http://xhr.spec.whatwg.org/
```

### Note about my Standalone example

* See ./front/src/assets/standalone-leaflet-test.html
    Lot of comments !!!!!!!
* Can't work  standalone (with scheme file:///) with Chromium, only with Firefox
    due to cross-orign policy restriction.
* See also https://github.com/JulioJu/ArtificialIntelligenceConnectFourGame

# TODO

## Secondary TODO

* For GET, add infinite scroll (example on JHipster).
* Add an eventSuscriber to subscribe to modifications (example on JHipster).
* Maybe use paramMap instead of params as explained
    https://angular.io/guide/router. But JHipster 5.0.0 use params, probably
    enough.
* See if router-outlet is the best directive for us.
* For Nurses add UNIQUE contraint in mongodb. Maybe it
    should not have two nurses with the same firstname or lastname.
    At Decathlon (French shop), we could have two persons with the same
    firstname and lastname, birthdate and address (I've had two cards).
* Front, form:
    * Front: for url `/*/entity-form` do not display the field with label `id`.
        In this case, ensure than
        `sessionStorage.getItem(this.formRoute)._id = ''`.
    * Front: test if the data exists in back, if data doesn't exists in back,
        ensure than `sessionStorage.getItem(this.formRoute)._id = ''` and
        display title `Creation`. Otherwise display `Edition`.

* Open a PR on @types/mongoose, see
    ./back/app/entities/abstract/abstract.mongoose.service

## Principal TODO

* <!-- * See [./tslint.yaml](./tslint.yaml) @todo. -->
* See section TODO in [./back/README.md](./back/README.md).
* <!-- Check my issue https://github.com/jhipster/generator-jhipster/issues/7302#issuecomment-373763536 --> Done
* Improve message error "duplicate key" in dynamic-form (like iSSN duplication
    key in /patient-form)
* For entities, actually REGEX of back doesn't match REGEX of back.
    See for example at `http://localhost:4200/#/bb` an object added thanks:
    ```
    $ curl --data "_id=bb&_idSSN=790089941908186&_firstname=value2&_lastname=value3&_gender=male&_birthday=coucou&_address=chouette" -X PUT http://localhost:8080/mongoose/patients
    ```
* Check if we could add validator for question-dropdown.ts
* Add success message for deletion, add, edit…
    Maybe we could also use an Angular service, like in JHipster
        or
    http://jasonwatmore.com/post/2017/06/25/angular&#45;2&#45;4&#45;alert&#45;toaster&#45;notifications
    Probably it's better if we have different sorts of messages.

* WARNING depreciation warnings for CRUD in back. Correct it.

* When we edit an existing form, and if nothing is found, we have
    a perpetual message 'Loading Form'

* Improve Openlayers map
    see also https://openlayers.org/en/latest/examples/draw-and-modify-features.html

# Notes for developers

* BIG WARNING:https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
    * « The pattern is not surrounded by forward slashes. »
        Chrome doesn't respect the specification, contrary to Firefox.
    * « Use the title attribute to describe the pattern to help the user. »
* For input attribute:
    * "attr." prefix seems bypass any angular conversion.
        * [required] attribute is converted to "ng-reflect-required"
        * [attr.required] gives "required"
* Fields could be cached in SessionStorage. Do not use SessionStorage to cache
    sensitive datas like passwords (be careful).
* Subtyping is better than generecity. Contrary to C#, we can't initialize
    a Generic Type in TypeScript or Java, otherwise we could delete constroctors
    of children class like in `patient-form.dynamic-form.component.ts`.
    Genericity declared like `abstract class myCl <T extends IAbstract>`
    add nothing (furthermore I've seen some false positive with `tsc`).
* At url `/*/patient-form/:id`, if the birthday field contains not a date,
    we have an error in console:
    « Deprecation warning: value provided is not in a recognized RFC2822 or ISO
    format. moment construction falls back to js Date()… + »
    No solution to avoid found this console.error()

* Migrate to TypeScript 3.1 with `noUnusedLocal` raise error 6133 when a private
    parameter is declared in a ts file and used in a template file (seems
    logic). Therefore they are changed to become protected.

* When for error handling `await` / `async` see
    https://javascript.info/async-await#error-handling
    ~~Note that in a Promise, we must continue to try and catch Promises
    called even if it is marked `async`.
    It's logical.~~
    Nested Promises, simply return the Promise!
    No need to try catch nested promises,

* For hierarchy of inheritance, with a class at the end, prefer use only
    classes (e.b ./back/app/entities/abstract/abstract.model)
    see at for instance at
    ./shared-back-front/entities-interface/abstract.interface.ts

* ./shared-back-front/entities-interface/abstract.interface.ts contains
    all type allowed. Could be any, probably, easier !
    See index signature at https://www.typescriptlang.org/docs/handbook/interfaces.html

* https://github.com/angular/angular/issues/13721
    Reactive forms are not strongly typed

* Symlink between Front and Back: so cool to use it but don't forget
    https://github.com/angular/angular-cli/issues/9807
    ```json
    "build": {
      "preserveSymlinks": true
      },
      ```

# Linting

* Use `typedef: true` is a very bad idea. Too much boilerplate,
    sometimes with this rule typedef are redundant e.g
    (imagine with lot of param, sometimes we have param definition
    on several lines).
    ```javascript
    const myFunc: (aa: string) => bool = (aa: string): bool => {
        return true;
    }
    ```
    * For a complet beginner it's could be cool, as it now I understand
        know it off by heart how to define types. But not cool when
        I come back to the code, too much boilerplate.
    * Therefore for back and front I use `typdef: true` except for
        `variable-declaration`

* In this project, `// tslint:disable:no-unsafe-any` in:
    * back/app/utils/route-main.ts
    * back/app/entities/abstract/abstract.route.ts
    * back/app/ObserverTests.ts
    * back/no-unsafe-any: false

# Issues and PR opened by me for this project:

* https://github.com/jhipster/generator-jhipster/pull/7311
    @types/mongoose findOneAndUpdate with option { rawResult: true }
    (corresponding issue: https://github.com/jhipster/generator-jhipster/issues/7302)

* https://github.com/DefinitelyTyped/DefinitelyTyped/pull/32874
    mongoose: complete and factorize FindAndRemove/Delete/Update Query
    NOTE: VERY IMPORTANT TO LEARN HOW MONGOOSE WORK, with thenable objects

* https://github.com/DefinitelyTyped/DefinitelyTyped/pull/32923
    @types/mongoose : validateSync returns ValidationError

* https://github.com/DefinitelyTyped/DefinitelyTyped/pull/32975
    @types/mongoose improve MongooseError definitions

* https://github.com/Automattic/mongoose/issues/7506
    [Docs] CRUD API, promise/thenable and callback.

* https://github.com/Automattic/mongoose/issues/7509
    [Doc] MongooseError should become simply Error

* https://github.com/Automattic/mongoose/pull/7513
    Doc: add an asterisk before comment, otherwise the comment line is not generated

* https://github.com/DefinitelyTyped/DefinitelyTyped/pull/32976
    @types/mongoose update(): add option multipleCastError

* https://github.com/Automattic/mongoose/pull/7515
    Doc ValidationError

* https://github.com/Automattic/mongoose/issues/7514
     Doc: Add Cast error exemple in validation.jade

* https://github.com/openlayers/openlayers/pull/9259
    Doc: precisions for IntelliSense configuration

* https://github.com/perliedman/leaflet-routing-machine/issues/516
    Doc: now OSRM supports routes for cars and bicycle

* https://github.com/openlayers/openlayers/issues/9228
    View.center seems not work

* https://github.com/OSHistory/ng7-ol5-demo/issues/2
    Cannot find module ol-integration

* https://github.com/openlayers/openlayers/pull/9259
    Doc: precisions for IntelliSense configuration

# Update
* Note for update, check
    https://github.com/Automattic/mongoose/issues/4768
    timestamps: updatedAt after findByIdAndUpdate

# Credit

* For css animation https://loading.io/css/

* In ./front/src/app/entities/patient/map/map-openlayers.component.css
    https://github.com/perliedman/leaflet-routing-machine/blob/master/dist/leaflet-routing-machine.css#L76,L100
