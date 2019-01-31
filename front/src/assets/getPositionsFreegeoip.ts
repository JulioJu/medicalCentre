/* =============================================================================
  *         AUTHOR: JulioJu
  *         GITHUB: https://github.com/JulioJu
  *        LICENSE: MIT (https://opensource.org/licenses/MIT)
  *        CREATED: Thu 31 Jan 2019 01:41:44 AM CET
  *       MODIFIED: Thu 31 Jan 2019 07:31:42 PM CET
  *
  *          USAGE:
  *
  *    DESCRIPTION:
  * ============================================================================
  */

type longLat = [number, number ];

const getPosition = async (): Promise<longLat> =>
    new Promise<longLat>((resolve: (value?: longLat) => void,
        // tslint:disable-next-line:no-any
        reject: (reason?: any) => void): void => {

    const url: string = 'https://freegeoip.app/json/';

    fetch(url)
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            }
            // Or reject, same bellow
            throw new Error('Fail because its got this response: ' + response);
        })
        .then((response: {latitude: number; longitude: number}) => {

            if (response.latitude && response.longitude) {
                const result: longLat = [0, 0];
                result[0] = response.latitude;
                result[1] = response.longitude;
                resolve(result);
                console.debug('coucou from getPositionFreegoip.ts', result);

            } else {
                reject(response);
            }
        });
    });

const retrieveGeoLocalisation = async (): Promise<longLat> =>
// See https://medium.com/@adeyinkaadegbenro/how-to-detect-the-location-of-your-websites-visitor-using-javascript-92f9e91c095f
    new Promise((resolve: (r: longLat) => void,
            reject: (e: string) => void): void => {
        if ('geolocation' in navigator) {
            // check if geolocation is supported/enabled on current browser
            navigator.geolocation.getCurrentPosition(
                (position: Position): void => {
                // for when getting location is a success
                resolve([position.coords.latitude,
                         position.coords.longitude]);
                },

                (errorMessage: PositionError) => {
                    // for when getting location results in an error
                    reject('Can\'t start app as you has forbidden ' +
                        ' access location' + errorMessage.message);
                }
            );
        } else {
            // geolocation is not supported
            // get your location some other way
            // reject('geolocation is not enabled on this browser')
            // Tested, work well.
            // But we don't ask to the user the authorization.
             getPosition()
                .catch(reject);
        }
    });
