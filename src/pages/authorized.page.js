import { expect } from '@playwright/test';                              //Импорт плейрайта
import { allure } from 'allure-playwright';                             //Импорт аллюра

class AuthorizedPage {
    constructor (page)
    {
    this.page = page;
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
    this.authLink = page.getByRole('link', { name: 'Log in' });
    }

    //Добровольный разлогин из авторизованной зоны
    async logout() {
        await allure.step('Нажимаем кнопку Log out', async () => {
            await this.logoutLink.click();
            //await page.getByRole('link', { name: 'Log out' }).click();
        });
    }
    
    //Ожидаемый результат
    async checkLogout() {
        await allure.step('Присутствует кнопка Log in (разлогинились)', async () => {
            await expect(this.authLink).toBeVisible();
            //await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
        });
    }
}
 
export {AuthorizedPage};