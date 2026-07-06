import { test, expect, APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type { SearchClientRequestBody } from '../types/RequestTypes'

//Получение локальной даты компуктера
const now = new Date();
const localDate = now.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
}) + ' ' + now.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
})

//Функция генерации телефонного номера
function generateSearchClientPhone(): string {
    let phoneNumber = `79`
    for (let i = 0; i < 9; i++) {
        phoneNumber += Math.floor(Math.random() * 10).toString();
    }
    return phoneNumber;
}

//Функция создания тела запроса searchclient
function buildSearchClientBody(): SearchClientRequestBody {

    const price = 100
    const quantity = 2
    const discountedPrice = 100
    const goodPromoCode = `01234567891`
    const couponPromoCode = `01234567891`
    return {
        search_mode: 0,
        search_value: generateSearchClientPhone(),
        goods_data: [
            {
                code: `2027`,
                barcode: `50055005`,
                vendor_code: `2702`,
                name: `Товар из автотеста`,
                variant: `Вариант товара из автотеста`,
                price,
                quantity,
                total: price * quantity,
                minPrice: 0,
                maxDiscount: 100,
                discounted_price: discountedPrice,
                discounted_total: discountedPrice * quantity,
                good_promo: [
                    goodPromoCode
                ]
            }
        ],
        promo_codes:
        {
            coupons: [
                {
                    coupon: couponPromoCode
                }
            ]
        },
        card_apply_dt: localDate,
        pos_discounts_are_used: 0
    }
}

//Тест searchclient валидный

//const url = api.buildLoadUrl('searchclient')

test('Валидный searchclient', async ({ request }) => {
    const body = buildSearchClientBody()
    const responce = await request.post(api.buildLoadUrl('searchclient'), {
        data: body
    })
    const responseBody = await responce.json()
    console.log('REQUEST_URL', api.buildLoadUrl('searchclient'))
    console.log('REQUEST_BODY', JSON.stringify(body, null, 2))
    console.log('RESPONSE_BODY', JSON.stringify(responseBody, null, 2))
})

test('Невалидный searchclient', async ({ request }) => {
    const invalidBody = buildSearchClientBody() as any
    invalidBody.search_mode = 999
    const responce = await request.post(api.buildLoadUrl('searchclient'), {
        data: invalidBody
    })
    const responseBody = await responce.json()
    console.log('REQUEST_URL', api.buildLoadUrl('searchclient'))
    console.log('REQUEST_BODY', JSON.stringify(invalidBody, null, 2))
    console.log('RESPONSE_BODY', JSON.stringify(responseBody, null, 2))
})