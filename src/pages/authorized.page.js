import { expect } from '@playwright/test';                              //Импорт плейрайта
import { allure } from 'allure-playwright';                             //Импорт аллюра

class AuthorizedPage {
    constructor (page)
    {
    this.page = page;
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
    }

    //Разлогин из авторизованной зоны
    async logout() {
        await allure.step('Нажимаем кнопку Log out', async () => {
            await this.logoutLink.click();
        });
    }
}
 
export {AuthorizedPage};