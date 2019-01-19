export const DEBUG_INFO_ENABLED: boolean = true;
export const APPLICATION_NAME: string = 'Medical Practice';
export const APPLICATION_NAME_PIPE: string = ' | ' + APPLICATION_NAME;
export const SERVER_API_URL: string = '';

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
