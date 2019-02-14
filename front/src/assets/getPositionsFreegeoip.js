/* =============================================================================
  *         AUTHOR: JulioJu
  *         GITHUB: https://github.com/JulioJu
  *        LICENSE: MIT (https://opensource.org/licenses/MIT)
  *        CREATED: Thu 31 Jan 2019 01:41:44 AM CET
  *       MODIFIED: Fri 15 Feb 2019 12:19:06 AM CET
  *
  *          USAGE:
  *
  *    DESCRIPTION:
  * ============================================================================
  */
const getPosition = async () => new Promise((resolve, 
// tslint:disable-next-line:no-any
reject) => {
    const url = 'https://freegeoip.app/json/';
    fetch(url)
        .then(async (response) => {
        if (response.ok) {
            return response.json();
        }
        // Or reject, same bellow
        throw new Error(`Fail because its got this response: ${response}`);
    })
        .then((response) => {
        if (response.latitude && response.longitude) {
            const result = [0, 0];
            result[0] = response.latitude;
            result[1] = response.longitude;
            resolve(result);
        }
        else {
            reject(response);
        }
    })
        .catch(reject);
});
export const retrieveGeoLocalisation = async () => 
// See https://medium.com/@adeyinkaadegbenro/how-to-detect-the-location-of-your-websites-visitor-using-javascript-92f9e91c095f
new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
        // check if geolocation is supported/enabled on current browser
        navigator.geolocation.getCurrentPosition((position) => {
            // for when getting location is a success
            resolve([position.coords.latitude,
                position.coords.longitude]);
        }, (errorMessage) => {
            // for when getting location results in an error
            reject('Can\'t start app as you has forbidden ' +
                ' access location' + errorMessage.message);
        });
    }
    else {
        // geolocation is not supported
        // get your location some other way
        // reject('geolocation is not enabled on this browser')
        // Tested, work well.
        // But we don't ask to the user the authorization.
        getPosition()
            .then(resolve)
            .catch(reject);
    }
});
