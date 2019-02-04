/* =============================================================================
  *         AUTHOR: JulioJu
  *         GITHUB: https://github.com/JulioJu
  *        LICENSE: MIT (https://opensource.org/licenses/MIT)
  *        CREATED: Mon 04 Feb 2019 10:03:29 AM CET
  *       MODIFIED: Mon 04 Feb 2019 06:06:49 PM CET
  *
  *          USAGE:
  *
  *    DESCRIPTION:
  * ============================================================================
  */

const commonArray = ['_firstname', '_lastname', '_address'];

// Just for bare Mongo (not Mangoose)
export const PutBareMongoMandatoryPerson = commonArray;

export const PutAllParametersPerson = ['_id'].concat(commonArray);
