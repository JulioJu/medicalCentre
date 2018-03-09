// tslint:disable:no-implicit-dependencies
import { browser, by, element } from 'protractor';

export class AppPage {
    async navigateTo(): Promise<any> {
        return browser.get('/');
    }

    async getParagraphText(): Promise<any> {
        return element(by.css('app-root h1'))
            .getText();
    }
}
