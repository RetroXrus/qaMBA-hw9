import {test as base} from '@playwright/test';
import { MainPage, AuthPage} from '/Users/r.tselybeev/qaMBA-hw9-1/src/pages/index.js'; //Импорт методов регистрации/авторизации

let mainPage
let authPage

export const test = base.extend({

loginAsFixture: async ({page}, use) => {
mainPage = new MainPage(page);
authPage = new AuthPage(page);
await page.goto('https://demowebshop.tricentis.com/');
await mainPage.gotoLogin();
await authPage.auth();

// use the fixture
await use(page);
}
});
export {expect} from '@playwright/test';