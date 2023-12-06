//import { test, expect } from '@playwright/test';                        //Импорт плейрайта. Убрали в следующей строке test, раз берем его из фикстуры
import { expect } from '@playwright/test';                                //Импорт плейрайта
//import { faker } from '@faker-js/faker';                                  //Импорт фейкера для генерации данных
import { UserBuilder } from '../src/shared/helpers/user.helper';        //Импорт вспомогательного билдера пользователя
import { allure } from 'allure-playwright';                             //Импорт аллюра
import { MainPage, RegisterPage, AuthPage, AuthorizedPage, CartPage } from '../src/pages/index'; //Импорт методов регистрации/авторизации
import { test } from '../srcExtended/fixture/all.fixture';                //Импорт фикстуры

//let firstname, lastname, email, password; //Использовалось фейкером на первых порах

//Создаем объекты пользователя и страниц для использования в тестах
let newUser
let mainPage
let registerPage
let authPage
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
    //Для использования PageObject, но можно обернуть в app (см.7-2)
    mainPage = new MainPage(page);
    registerPage = new RegisterPage(page);
    authPage = new AuthPage(page);
    authorizedPage = new AuthorizedPage(page);
    cartPage = new CartPage(page);
  });

//Тесты
//Тест 1
test.describe('Регистрация пользователя', () => {
    test('Регистрация муж', async ({ page }) => {
        //console.log(newUser); //использовал для проверки того, что в тест подтягивается объет пользователя
        //allure epic
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
        await allure.step('Присутствует надпись Your registration completed', async () => {
            await expect(page.getByText('Your registration completed')).toBeVisible();
            });
        await allure.step('Присутствует кнопка Email', async () => {
            await expect(page.getByRole('link', { name: newUser.email })).toBeVisible();
            });
    });
});

//Тест 2
test.describe('Авторизация пользователя', () => {
    test('Авторизация существующего пользователя', async ({ page }) => {
        //allure epic
        await allure.epic('Авторизация');
        //Шаги
        //Открываем авторизацию
        await mainPage.gotoLogin();
        //Авторизуемся
        await authPage.auth();
        //Ожидаемый результат авторизации
        await allure.step('Присутствует кнопка Email', async () => {
            await expect(page.getByRole('link', { name: 'lastomemento@c.com' })).toBeVisible();
        });
        });
});

//Тест 2 через фикстуру
test('Авторизация через фикстуру', async ({ loginAsFixture }) => {
    await allure.step('Присутствует кнопка Email', async () => {
        await expect(loginAsFixture.getByRole('link', { name: 'lastomemento@c.com' })).toBeVisible();
    });
  });

//Тест 3
test.describe('Разлогин', () => {
    test('Разлогин авторизованного пользователя', async ({ page }) => {
        //allure epic
        await allure.epic('Разлогин');
        //Шаги
        //Открываем авторизацию
        await mainPage.gotoLogin();
        //Авторизуемся
        await authPage.auth();
        //Разлогиниваемся
        await authorizedPage.logout();
        //Ожидаемый результат
        await allure.step('Присутствует кнопка Log in (разлогинились)', async () => {
            await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
        });
        });
});

//Тест 4
test.describe('Рассылки', () => {
    test('Подписка на рассылку через email', async ({ page }) => {
        //allure epic
        await allure.epic('Рассылки');
        //Шаги
        //Подписываемся на рассылку
        await mainPage.newsletterSubscribe(newUser.email);
        //Проверяем, что вывелось сообщение об успешной подписке
        await allure.step('Присутствует надпись Thank you for signing up! A', async () => {
            await expect(page.getByText('Thank you for signing up! A')).toBeVisible();
        });
    });
});

//Тест 5
test.describe('Корзина', () => {
    test('Добавление товара в корзину', async ({ page }) => {
        //allure epic
        await allure.epic('Корзина');
        //Шаги
        //Добавляем товар в корзину
        await mainPage.addToCart();
        //Ожидаемый результат
        await allure.step('Товар присутствует в корзине', async () => {
            await expect(page.getByRole('img', { name: 'Picture of 14.1-inch Laptop' })).toBeVisible();
        });
    });
});