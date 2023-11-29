import { test, expect } from '@playwright/test';                        //Импорт плейрайта
import {faker} from '@faker-js/faker';                                  //Импорт фейкера для генерации данных
import { UserBuilder } from '../src/shared/helpers/user.helper';        //Импорт вспомогательного билдера пользователя
import { allure } from 'allure-playwright';                             //Импорт аллюра
import { MainPage, RegisterPage, LoginPage, AuthorizedPage, CartPage } from '../src/pages/index'; //Импорт методов регистрации/авторизации

//let firstname, lastname, email, password; //Использовалось фейкером на первых порах

//Создаем объекты пользователя и страниц для использования в тестах
let newUser
let mainPage
let registerPage
let loginPage
let authorizedPage
let cartPage

//Открытие тестируемого сайта перед каждым запуском
test.beforeEach(async ({ page }) => {
    //Выводим название выполняемых кейсов в консоль
    console.log('Running ${testInfo.title}');
    //Открываем при каждом запуске теста страницу сайта
    await allure.step('Открываем сайт', async () => {
        await page.goto('https://demowebshop.tricentis.com/');
        });
    //Присваиваем объекту Пользователь данные из фейкера для использовани в тестах
    newUser = new UserBuilder().setName().setSurname().setEmail().setPassword()
        .build();
    //Добавляем PageObject
    mainPage = new MainPage(page);
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    authorizedPage = new AuthorizedPage(page);
    cartPage = new CartPage(page);
  });

//Тесты
//Тест 1
test.describe('Регистрация пользователя', () => {
    test('Регистрация муж', async ({ page }) => {
        //console.log(newUser); //использовал для проверки того, что в тест подтягивается объет пользователя
        //allure
        await allure.epic('Регистрация');

        //Шаги
        //Открываем регистрацию
        await mainPage.register();
        //todo Добавить возможность выбора иного пола через рандомайзер
        await allure.step('Выбираем мужской пол', async () => {
        await page.getByLabel('Male', { exact: true }).check();
        });
        //Регистируемся
        await registerPage.registerMale(newUser.firstname, newUser.lastname, newUser.email, newUser.password, newUser.password);
        //Ожидаемый результат регистрации
        await registerPage.checkRegister(newUser.email);
    });
});

//Тест 2
test.describe('Авторизация пользователя', () => {
    test('Авторизация существующего пользователя', async ({ page }) => {
        //allure
        await allure.epic('Авторизация');
        //Шаги
        //Открываем авторизацию
        await mainPage.login();
        //Авторизуемся
        await loginPage.login();
        //Ожидаемый результат авторизации
        await loginPage.checkLogin();
        });
});

//Тест 3
test.describe('Разлогин', () => {
    test('Разлогин авторизованного пользователя', async ({ page }) => {
        //allure
        await allure.epic('Разлогин');
        //Шаги
        //Открываем авторизацию
        await mainPage.login();
        //Авторизуемся
        await loginPage.login();
        //Разлогиниваемся
        await authorizedPage.logout();
        //Ожидаемый результат
        await authorizedPage.checkLogout();
        });
});

//Тест 4
test.describe('Рассылки', () => {
    test('Подписка на рассылку через email', async ({ page }) => {
        //allure
        await allure.epic('Рассылки');
        //Шаги
        //Подписываемся на рассылку
        await mainPage.newsletterSubscribe(newUser.email);
        //Проверяем, что вывелось сообщение об успешной подписке
        await mainPage.checkNewsletterSubscribe();
    });
});

//Тест 5
test.describe('Корзина', () => {
    test('Добавление товара в корзину', async ({ page }) => {
        //allure
        await allure.epic('Корзина');
        //Шаги
        //Добавляем товар в корзину
        await mainPage.addToCart();
        //Ожидаемый результат
        await cartPage.checkAddedToCart();
    });
});