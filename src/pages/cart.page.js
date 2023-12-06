import { expect } from '@playwright/test';                              //Импорт плейрайта
import { allure } from 'allure-playwright';                             //Импорт аллюра

class CartPage {
    constructor (page)
    {
    this.page = page;
    this.productN2 = page.getByRole('img', { name: 'Picture of 14.1-inch Laptop' });
    }
    } 
    
    export {CartPage};