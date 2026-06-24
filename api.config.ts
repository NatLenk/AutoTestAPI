import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, './.env') });

const baseUrl = process.env.baseUrl as string
const token = process.env.token as string

export const apiConfig = {
    baseUrl,
    token
};

//Функция создания url с проверкой и удалением лишних слешей перед endpoint
export function buildLoadUrl(endpoint: string): string {
    const normalizedEndpoint = endpoint.replace(/^\/+/, '');

    const url = new URL(`${normalizedEndpoint}`, apiConfig.baseUrl);

    url.searchParams.set('h', apiConfig.token);

    return url.toString();
}

//Функция генерации телефонного номера
export function generateClientPhone(): string {
    let phoneNumber = `79`
    for (let i = 0; i < 9; i++) {
        phoneNumber += Math.floor(Math.random() * 10).toString();
    }
    return phoneNumber;
}

//Функция создания тела запроса searchclient
export function buildSearchClientBody() {

    const price = 100

    const quantity = 2

    const discountedPrice = 100

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

    return {
        search_mode: 0,
        search_value: generateClientPhone(),
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
                parent_code: null,
                parent_vendor_code: null,
                good_promo: [
                    `01234567891`
                ]
            }
        ],
        promo_codes: [
            {
                coupons: [
                    {
                        coupon: `01234567891`
                    }
                ]
            }
        ],
        card_apply_dt: localDate,
        pos_discounts_are_used: 0
    }
}