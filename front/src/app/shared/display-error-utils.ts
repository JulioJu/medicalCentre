/* =============================================================================
  *         AUTHOR: JulioJu
  *         GITHUB: https://github.com/JulioJu
  *        LICENSE: MIT (https://opensource.org/licenses/MIT)
  *        CREATED: Wed 06 Feb 2019 07:01:26 PM CET
  *       MODIFIED: Wed 06 Feb 2019 09:28:22 PM CET
  *
  *          USAGE:
  *
  *    DESCRIPTION:
  * ============================================================================
  */
import { HttpErrorResponse } from '@angular/common/http';

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

export const ShowError = (err: string): void => {
    console.error('ERROR', err);
    const docErrorForm: HTMLElement | null = document
        .getElementById('errorForm');
    if (docErrorForm) {
        if (docErrorForm.firstChild) {
            removeErrorBanner(docErrorForm);
            window.setTimeout(() => {
                showError(docErrorForm, err);
            // tslint:disable-next-line:no-magic-numbers
            } , 50);
        } else {
            showError(docErrorForm, err);
        }
    }
};

export const ShowMongoError = (err: HttpErrorResponse): void => {
    console.error(err);
    let details = 'Can\'t be parsed';
    // tslint:disable:no-unsafe-any
    if (err.error.errmsg) {
        details = err.error.errmsg;
    } else if (err.error.name) {
        details = err.error.name;
    }
    // tslint:enable:no-unsafe-any
    ShowError(
        `code: ${err.status}  status:${err.statusText} Details:${details}`);
};

export const CatchAndDisplayError = (e: Error): void => {
    console.error(e);
    ShowError(e.message);
};
