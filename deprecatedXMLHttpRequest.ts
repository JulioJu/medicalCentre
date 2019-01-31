/* =============================================================================
  *         AUTHOR: JulioJu
  *         GITHUB: https://github.com/JulioJu
  *        LICENSE: MIT (https://opensource.org/licenses/MIT)
  *        CREATED: Wed 30 Jan 2019 08:56:39 PM CET
  *       MODIFIED: Thu 31 Jan 2019 02:07:04 AM CET
  *
 *          USAGE: tsc ./deprecatedXMLHttpRequest.ts --target es2017
 *                  then load it in an HTML file. Warning: deprecated
              Result: Synchronous XMLHttpRequest on the main thread
            is deprecated because of its detrimental
                effects to the end user’s experience.
                For more help http://xhr.spec.whatwg.org/
  *
  *    DESCRIPTION:
  * ============================================================================
  */

type longLat = [number, number ];

const getPosition = (): Promise<longLat> =>
    new Promise<longLat>((resolve: (r: longLat) => void,
        reject: (e: string) => void): void => {

        const url: string = 'https://freegeoip.app/json/';

        // use `fetch' method instead. `xhr' is more verbose than fetch method.
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onload = (): void => {
            const status = xhr.status;
            const statusOK: number = 200;

            if (status === statusOK) {
                const geoipResponse = JSON.parse(xhr.responseText);
                const result: longLat = [0, 0];
                result[0] = geoipResponse.latitude;
                result[1] = geoipResponse.longitude;
                resolve(result);
            } else {
                reject('Leaflet.GeoIP.getPosition failed because its'
                    + 'XMLHttpRequest got this response: ' + xhr.status);
            }
        };
        xhr.onerror = (): void => {
            reject('Leaflet.GeoIP.getPosition failed because its'
                + 'XMLHttpRequest got this response: ' + xhr.status);
        };
        xhr.send();

    });

getPosition()
    .then((longLatRes: longLat) => console.debug(longLatRes))
    .catch(((e: string): void => console.error(e)));
