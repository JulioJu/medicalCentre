export const DEBUG_INFO_ENABLED = true;
export const APPLICATION_NAME = 'Medical Practice';
export const APPLICATION_NAME_PIPE = ' | ' + APPLICATION_NAME;
export const SERVER_API_URL = '';
// Constructs thanks Wikipedia FR
// A larger solution is by « Casse nationale d'assurance maladie »
// https://www.net-entreprises.fr/wp-content/uploads/2017/01/n4ds_cahier-technique_v01x11.pdf
// p.18
export const REGEXFRENCH = /^[a-zA-ZçÇéÉàèùÀÈÙâêîôûÂÊÎÔÛüëïüÿËÏÜŸ'-]+$/;
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
export const REGEXW3CEMAIL = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
