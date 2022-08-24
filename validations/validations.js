import {body} from "express-validator";

export const clothesCreateValidation = [
    body('title', 'Введите название товара').isLength({min: 3}).isString(),
    body('price', 'Введите цену товара').isNumeric(),
    body('sizes', 'Неверный формат размеров (укажите массив)').optional().isArray(),
    body('inStock', 'Неверный формат размеров (укажите массив)').optional().isNumeric(),
    body('images', 'Неверный формат картинок (укажите массив)').optional().isArray(),
    body('category', 'Введите категорию').isString(),
]

export const addOrderValidation = [
    body('name', 'Введите ваше имя').isLength({min: 3}).isString(),
    body('surname', 'Введите ваше фамилие').isLength({min: 3}).isString(),
    body('email', 'Введите ваш email').isLength({min: 3}).isEmail(),
    body('phone', 'Введите ваш номер телефона').isLength({min: 12}),
    body('orders', 'Сделайте покупку').isArray(),
]
