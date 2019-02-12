/* =============================================================================
  *         AUTHOR: JulioJu
  *         GITHUB: https://github.com/JulioJu
  *        LICENSE: MIT (https://opensource.org/licenses/MIT)
  *        CREATED: Tue 12 Feb 2019 05:41:38 PM CET
  *       MODIFIED: Tue 12 Feb 2019 09:54:42 PM CET
  *
  *          USAGE:
  *
  *    DESCRIPTION:
  * ============================================================================
  */

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
export const messageREGEXSLASHW: string = 'french alphanumeric characters,'
    + ' including dash and simple quote.';
export const REGEXSLASHW: RegExp = /^\w+$/;

// Constructs thanks Wikipedia FR
// A larger solution is by « Casse nationale d'assurance maladie »
// https://www.net-entreprises.fr/wp-content/uploads/2017/01/n4ds_cahier-technique_v01x11.pdf
// p.18
export const messageREGEXFRENCH: string = 'french alphanumeric characters'
    + ', including dash and simple quote.';
export const REGEXFRENCH: RegExp = /^[a-zA-ZçÇéÉàèùÀÈÙâêîôûÂÊÎÔÛüëïüÿËÏÜŸ'-]+$/;

// See also:
// 1) "Validators.email should allow null/empty values"
// Fixed in v6.
// https://github.com/angular/angular/issues/16183
// 2) See also  "Validator.email may need some rework - Or a new universal email
// validator is required"
// https://github.com/angular/angular/issues/17296
// 3) https://www.w3.org/TR/html5/forms.html#valid-e-mail-address
// See https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains
// tslint:disable-next-line:max-line-length
export const REGEXW3CEMAIL: RegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const REGEXADDRESS: RegExp =
    /^[ 0-9a-zA-ZçÇéÉàèùÀÈÙâêîôûÂÊÎÔÛüëïüÿËÏÜŸ'-]+$/;
export const messageREGEXADDRESS: string =
    'french alphabetic, dash, simple quote, space and/or numeric characters .';

export const idSSNReg: RegExp = /^[\d]{15}$/;

export const birthdateMinDate: Date = new Date(new Date().getFullYear() - 122);
export const birthdateMaxDate: Date =
    // Don't forget that `new Date('january').getMonth() === 0'
    new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`
                + `-${new Date().getDate() - 1}`);
