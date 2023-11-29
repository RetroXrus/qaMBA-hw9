import { expect } from '@playwright/test';                              //Импорт плейрайта
import { allure } from 'allure-playwright';                             //Импорт аллюра

class RegisterPage {
    constructor (page)
    {
    this.page = page;
    this.firstNameField = page.getByLabel('First name:');
    this.lastNameField = page.getByLabel('Last name:');
    this.emailField = page.getByLabel('Email:');
    this.passwordField = page.getByLabel('Password:', { exact: true });
    this.confirmPasswordField = page.getByLabel('Confirm password:');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.successRegMessage = page.getByText('Your registration completed');
    //todo придумать как заиспользовать тут почту для checkRegister(), что приходит нам из созданного объекта
    //this.emailLink = page.getByRole('link', { name: email });
    }

    async registerMale(firstName='', lastName='', email='', password='', confirmPassword='') {
        await allure.step('Вводим имя', async () => {
            await this.firstNameField.fill(firstName);
            });
        await allure.step('Вводим фамилию', async () => {
            await this.lastNameField.fill(lastName);
            });
        await allure.step('Вводим почту', async () => {
            await this.emailField.fill(email);
            }); 
        await allure.step('Вводим пароль', async () => {
            await this.passwordField.fill(password);
            });
        await allure.step('Подтверждаем пароль', async () => {
            await this.confirmPasswordField.fill(confirmPassword);
            });
        await allure.step('Нажимаем кнопку Register', async () => {
            await this.registerButton.click();
            });
    }

    async checkRegister(email='') {
        await allure.step('Присутствует надпись Your registration completed', async () => {
            await expect(this.successRegMessage).toBeVisible();
            });
        await allure.step('Присутствует кнопка Email', async () => {
            //await expect(this.emailLink).toBeVisible();
            await expect(this.page.getByRole('link', { name: email })).toBeVisible();
            });
    }
}
 
export {RegisterPage};