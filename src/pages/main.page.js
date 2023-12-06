import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';                             //Импорт аллюра

class MainPage {
    constructor (page)
    {
    this.page = page;
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.newsLetter = page.locator('#newsletter-email');
    this.subscribeButton = page.getByRole('button', { name: 'Subscribe' });
    this.productN2 = page.locator('div:nth-child(3) > .product-item > .details > .add-info > .buttons > .button-2');

    }

    //Регистрация
    async register()
    {
        await allure.step('Нажимаем кнопку Register', async () => {
            await this.registerLink.click();
        });
    }
    //Авторизация
    async gotoLogin()
    {
        await allure.step('Нажимаем кнопку Log in', async () => {
            await this.loginLink.click();
        });
    }
    //Подписываемся на рассылку писем
    async newsletterSubscribe(email='')
    {
        await allure.step('Вводим почту', async () => {
            await this.newsLetter.fill(email);
        });
            await allure.step('Нажимаем кнопку Subscribe', async () => {
            await this.subscribeButton.click();
        });
    }

    //Добавление в корзину и переход в нее
    async addToCart()
    {
         await allure.step('Нажимаем кнопку Add to cart', async () => {
            await this.productN2.click();
            await this.page.reload({ waitUntil: 'domcontentloaded' });
        });
            await allure.step('Открываем корзину', async () => {
            await this.page.goto('https://demowebshop.tricentis.com/cart');
        });
    }
} 
    
    export {MainPage};