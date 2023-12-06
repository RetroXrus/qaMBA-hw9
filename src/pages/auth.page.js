import { expect } from '@playwright/test';                              //Импорт плейрайта
import { allure } from 'allure-playwright';                             //Импорт аллюра

class AuthPage {
    constructor (page)
    {
    this.page = page;
    this.emailField = page.getByLabel('Email:');
    this.emailName = 'lastomemento@c.com';
    this.passwordField = page.getByLabel('Password:');
    this.Password = 'qwerty';
    this.authButton = page.getByRole('button', { name: 'Log in' });
    }

    async auth() {
        await allure.step('Вводим почту', async () => {
            await this.emailField.fill(this.emailName);
        });
            await allure.step('Вводим пароль', async () => {
            await this.passwordField.fill(this.Password)
        });
            await allure.step('Нажимаем кнопку Log in', async () => {
            await this.authButton.click();
        });
    }
}
 
export {AuthPage};