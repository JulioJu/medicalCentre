/* =============================================================================
  *         AUTHOR: JulioJu
  *         GITHUB: https://github.com/JulioJu
  *        LICENSE: MIT (https://opensource.org/licenses/MIT)
  *        CREATED: Wed 06 Feb 2019 07:01:26 PM CET
  *       MODIFIED: Wed 27 Feb 2019 12:09:38 PM CET
  *
  *          USAGE:
  *
  *    DESCRIPTION:
  * ============================================================================
  */
import { HttpErrorResponse } from '@angular/common/http';

// tested with `tsc -p tsconfig.json'
// This import is not generated in the corresponding javascript file.
// tslint:disable:no-implicit-dependencies
import { MongoError } from 'mongodb';

const showError = (docErrorForm: HTMLElement,
    err: string): void => {

    docErrorForm.appendChild(
        document.createTextNode(
            'ERROR: ' + err
        )
    );
    docErrorForm.style.display = 'block';
};

const removeErrorBanner = (docErrorForm: HTMLElement): void => {
    while (docErrorForm.firstChild) {
        docErrorForm
            .removeChild(docErrorForm.firstChild);
        docErrorForm.style.display = 'none';
    }
};

export const TriggerRemoveBanner = (): void => {
    const docErrorForm: HTMLElement | null =
        document.getElementById('errorForm');
    if (docErrorForm && docErrorForm.firstChild) {
        removeErrorBanner(docErrorForm);
    }
};

export const ShowError = (err: Error, messageInBanneer?: string): void => {
    const docErrorForm: HTMLElement | null = document
        .getElementById('errorForm');
    const messageToDisplay = messageInBanneer
        ? messageInBanneer
        : err.message;
    if (docErrorForm) {
        if (docErrorForm.firstChild) {
            removeErrorBanner(docErrorForm);
            window.setTimeout(() => {
                showError(docErrorForm, messageToDisplay);
            // tslint:disable-next-line:no-magic-numbers
            } , 50);
        } else {
            showError(docErrorForm, messageToDisplay);
        }
    }
};

export const ShowMongoError = (err: HttpErrorResponse): void => {
    let details = 'Can\'t be parsed';
    // tslint:disable-next-line:no-magic-numbers
    if (err.status === 502 && (err.error as MongoError).errmsg) {
        details += `Error with the mongo service: is it started? ` +
            `${(err.error as MongoError).errmsg}`;
    }
    ShowError(err,
        `code: ${err.status}  status:${err.statusText} Details:${details}`);
};

/**
 *  Precondition: `console.error` where this function is called
 *  as it we know where this function is called (thanks map).
 */
export const CatchAndDisplayError = (e: Error): void => {
    ShowError(e);
};
