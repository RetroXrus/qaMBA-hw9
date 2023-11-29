import { expect } from '@playwright/test';                              //Импорт плейрайта
import { allure } from 'allure-playwright';                             //Импорт аллюра

class CartPage {
    constructor (page)
    {
    this.page = page;
    this.productN2 = page.getByRole('img', { name: 'Picture of 14.1-inch Laptop' });
    }

    //Ожидаемый результат добавления в корзину - изображение товара
    async checkAddedToCart()
    {
        await allure.step('Товар присутствует в корзине', async () => {
            await expect(this.productN2).toBeVisible();
            //await expect(page.getByRole('img', { name: 'Picture of 14.1-inch Laptop' })).toBeVisible();
        });
    }
    
    } 
    
    export {CartPage};