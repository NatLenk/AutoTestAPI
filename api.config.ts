import { GoodsData } from './types/RequestTypes';
import { APIResponse } from '@playwright/test';


//Функция валидирования обязательных переменных для запуска проекта
function requiredEnv(name: string): string {
    const value = process.env[name]

    if (!value) {
        throw new Error(`Required environment variable ${name} is missing`)
    }

    return value
}

const baseUrl = requiredEnv('BASE_URL')
const token = requiredEnv('API_TOKEN')

/*export const apiConfig = {
    baseUrl,
    token
};*/

//Функция создания url с проверкой и удалением лишних слешей перед endpoint
export function buildLoadUrl(endpoint: string): string {
    const normalizedEndpoint = endpoint.replace(/^\/+/, '');

    const url = new URL(`${normalizedEndpoint}`, baseUrl);

    url.searchParams.set('h', token);

    return url.toString();
}

//Функция получение локальной даты компьютера
export function getLocalDateTime(date = new Date()): string {
    const pad = (value: number): string => value.toString().padStart(2, '0')

    const day = pad(date.getDate())
    const month = pad(date.getMonth() + 1)
    const year = date.getFullYear()
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())

    return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`
}

//Функция логирования запроса
export function logApiRequest(
    url: string,
    body: unknown
) {
    const safeUrl = new URL(url)
    safeUrl.searchParams.set('h', '***')

    console.log('REQUEST_URL', url)
    console.log('REQUEST_BODY', JSON.stringify(body, null, 2))
}

//Функция логирования ответа
export function logApiResponse(
    response: APIResponse,
    responseBody: unknown
) {
    console.log('STATUS', response.status())
    console.log('RESPONSE_BODY', JSON.stringify(responseBody, null, 2))
}

//Функция генерации телефонного номера
export function generateClientPhone(): string {
    let phoneNumber = `79`
    for (let i = 0; i < 9; i++) {
        phoneNumber += Math.floor(Math.random() * 10).toString();
    }
    return phoneNumber;
}

//Функция создания массива goods_data
export function buildGoodsData(): GoodsData[] {
    const price = 100
    const quantity = 2
    const discountedPrice = 100
    const goodPromoCode = `01234567891`

    return [
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
    ]
}