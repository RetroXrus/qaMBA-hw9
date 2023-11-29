import { expect } from '@playwright/test';                              //Импорт плейрайта
import { allure } from 'allure-playwright';                             //Импорт аллюра

class LoginPage {
    constructor (page)
    {
    this.page = page;
    this.emailField = page.getByLabel('Email:');
    this.emailName = 'lastomemento@c.com';
    this.passwordField = page.getByLabel('Password:');
    this.Password = 'qwerty';
    this.authButton = page.getByRole('button', { name: 'Log in' });
    }

    async login() {
        await allure.step('Вводим почту', async () => {
            await this.emailField.fill(this.emailName);
            //await page.getByLabel('Email:').fill('lastomemento@c.com');
        });
            await allure.step('Вводим пароль', async () => {
            await this.passwordField.fill(this.Password)
            //await page.getByLabel('Password:').fill('qwerty');
        });
            await allure.step('Нажимаем кнопку Log in', async () => {
            await this.authButton.click();
            //await page.getByRole('button', { name: 'Log in' }).click();
        });
    }
    
    //Ожидаемый результат
    async checkLogin() {
        await allure.step('Присутствует кнопка Email', async () => {
            await expect(this.page.getByRole('link', { name: this.emailName })).toBeVisible();
            //await expect(page.getByRole('link', { name: 'lastomemento@c.com' })).toBeVisible();
        });
    }
}
 
export {LoginPage};