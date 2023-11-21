import { test, expect } from '@playwright/test';                    //Импорт плейрайта
import {faker} from '@faker-js/faker';                              //Импорт фейкера для генерации данных
import { UserBuilder } from '../src/shared/helpers/user.helper';    //Импорт вспомогательного билдера пользователя

//let firstname, lastname, email, password; //Использовалось фейкером

//Не смог заставить работать тесты, если использовать создание объекта в beforeEach / beforeAll
const newUser = new UserBuilder().setName().setSurname().setEmail().setPassword()
        .build();

//Открытие тестируемого сайта перед каждым запуском
test.beforeEach(async ({ page }) => {
    //Выводим название выполняемых кейсов в консоль
    console.log('Running ${testInfo.title}');
    //Создаем объект Пользователь
    /*
    const newUser = new UserBuilder().setName().setSurname().setEmail().setPassword()
        .build();
        */
    //Открываем при каждом запуске теста страницу сайта
    await page.goto('https://demowebshop.tricentis.com/');
  });

//Тесты
//Тест 1
test.describe('Регистрация', () => {
    test('Регистрация муж', async ({ page }) => {
        //Шаги
        await page.getByRole('link', { name: 'Register' }).click();
        await page.getByLabel('Male', { exact: true }).check();
        await page.getByLabel('First name:').fill(newUser.firstname);
        await page.getByLabel('Last name:').fill(newUser.lastname);
        await page.getByLabel('Email:').fill(newUser.email);
        await page.getByLabel('Password:', { exact: true }).fill(newUser.password);
        await page.getByLabel('Confirm password:').fill(newUser.password);
        await page.getByRole('button', { name: 'Register' }).click();
        //Ожидаемый результат
        await expect(page.getByText('Your registration completed')).toBeVisible();
        await expect(page.getByRole('link', { name: newUser.email })).toBeVisible();
    
    });
});

//Тест 2
test.describe('Авторизация', () => {
    test('Авторизация существующего пользователя', async ({ page }) => {
        //Шаги
        await page.getByRole('link', { name: 'Log in' }).click();
        await page.getByLabel('Email:').fill('lastomemento@c.com');
        await page.getByLabel('Password:').fill('qwerty');
        await page.getByRole('button', { name: 'Log in' }).click();
        //Ожидаемый результат
        await expect(page.getByRole('link', { name: 'lastomemento@c.com' })).toBeVisible();
    });
});

//Тест 3
test.describe('Разлогин', () => {
    test('Разлогин авторизованного пользователя', async ({ page }) => {
        //Шаги
        await page.getByRole('link', { name: 'Log in' }).click();
        await page.getByLabel('Email:').fill('lastomemento@c.com');
        await page.getByLabel('Password:').fill('qwerty');
        await page.getByRole('button', { name: 'Log in' }).click();
        await page.getByRole('link', { name: 'lastomemento@c.com' }).click();
        await page.getByRole('link', { name: 'Log out' }).click();
        //Ожидаемый результат
        await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
        });
});

//Тест 4
test.describe('Новостные письма', () => {
    test('Подписка на рассылку через email', async ({ page }) => {
        //Шаги
        await page.locator('#newsletter-email').fill(newUser.email);
        await page.getByRole('button', { name: 'Subscribe' }).click();
        //Ожидаемый результат
        await expect(page.getByText('Thank you for signing up! A')).toBeVisible();
    });
});

//Тест 5
test.describe('Корзина', () => {
    test('Добавление товара в корзину', async ({ page }) => {
        //Шаги
        await page.locator('div:nth-child(3) > .product-item > .details > .add-info > .buttons > .button-2').click();
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.goto('https://demowebshop.tricentis.com/cart');
        //Ожидаемый результат
        await expect(page.getByRole('img', { name: 'Picture of 14.1-inch Laptop' })).toBeVisible();
    });
});