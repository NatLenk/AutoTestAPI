import { expect, APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

export const searchClientUrl = api.buildLoadUrl('searchclient')
export const addClientUrl = api.buildLoadUrl('addclient')
export const getClientFullBalanceUrl = api.buildLoadUrl('getclientfullbalance')
export const manualAddUrl = api.buildLoadUrl('manualadd')
export const getClientCardsUrl = api.buildLoadUrl('getclientcards')
export const replaceCardUrl = api.buildLoadUrl('replacecard')
export const blockCardUrl = api.buildLoadUrl('blockcard')
export const getConfirmationCodeUrl = api.buildLoadUrl('getconfirmationcode')

//Функция создания тела запроса addclient
export function buildAddClientBody(phone: string, clientId: number | null): Types.AddClientRequestBody {
    return {
        client_id: clientId,
        phone: phone
    }
}

//Функция поиска свободного client_id
export async function searchClientId(
    request: APIRequestContext,
    phone: string
): Promise<number | null> {
    const body: Types.SearchClientRequestBody = {
        search_mode: 0,
        search_value: phone
    }

    const response = await request.post(searchClientUrl, {
        data: body
    })

    expect(response.status()).toBe(200)

    const responseBody =
        await response.json() as Types.SearchClientResponseBody

    api.logApiRequest(searchClientUrl, body)
    api.logApiResponse(response, responseBody)

    if (responseBody.client_id === null) {
        return null
    }

    const clientId = Number(responseBody.client_id)

    if (!Number.isSafeInteger(clientId)) {
        throw new Error(
            `Некорректный client_id: ${responseBody.client_id}`
        )
    }

    return clientId
}

//Функция поиска свободного номера телефона
export async function findUnusedPhone(
    request: APIRequestContext
): Promise<string> {
    const maxAttempts = 20

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const phone = generateClientPhone()
        const clientId = await searchClientId(request, phone)

        if (clientId === null) {
            return phone
        }
    }

    throw new Error(
        `Не удалось подобрать свободный телефон за ${maxAttempts} попыток`
    )
}

//Функция создания тестового клиента 
export async function createTestClient(
    request: APIRequestContext
): Promise<{ phone: string; clientId: number }> {
    const phone = await findUnusedPhone(request)
    const body = buildAddClientBody(phone, null)

    const response = await request.post(addClientUrl, {
        data: body
    })

    expect(response.status()).toBe(200)

    const clientId = await searchClientId(request, phone)

    if (clientId === null) {
        throw new Error(
            `Созданный клиент с телефоном ${phone} не найден`
        )
    }

    return {
        phone,
        clientId
    }
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
export function buildGoodsData(): Types.GoodsData[] {
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

//Функция создания тела запроса searchclient
export function buildSearchClientBody(phone: string): Types.SearchClientRequestBody {

    const couponPromoCode = `01234567891`

    return {
        search_mode: 0,
        search_value: phone,
        goods_data: buildGoodsData(),
        promo_codes:
        {
            coupons: [
                {
                    coupon: couponPromoCode
                }
            ]
        },
        card_apply_dt: api.getLocalDateTime(),
        full_data: false,
        pos_discounts_are_used: 0
    }
}

//Функция подсчета баланса клиента
export function calculateTotalBalance(items: Types.BalanceItem[]): number {
    return items.reduce((total, item) => {
        return total + Number(item.balance)
    }, 0)
}

//Функция построения тела запроса getclientfullbalance
export function buildBalanceBody(client_id: number): Types.GetClientFullBalanceRequestBody {
    return {
        client_id: client_id
    }
}

// Функция получения общего баланса клиента
export async function getClientBalance(
    request: APIRequestContext,
    clientId: number
): Promise<number> {
    const body = buildBalanceBody(clientId)

    const response = await request.post(getClientFullBalanceUrl, {
        data: body
    })
    expect(response.status()).toBe(200)

    const responseBody = await response.json() as Types.BalanceItem[]

    api.logApiRequest(getClientFullBalanceUrl, body)
    api.logApiResponse(response, responseBody)

    expect(Array.isArray(responseBody)).toBe(true)

    return calculateTotalBalance(responseBody)
}

//Функция создания тела запроса manualadd
export function buildManualAddBody(
    clientId: number,
    bonusAmount: number
): Types.ManualAdd {
    return {
        client_id: clientId,
        bonus_in: bonusAmount,
        description: 'Начисление бонусов автотестом'
    }
}

//Функция начисления бонусов
export async function addManualBonus(
    request: APIRequestContext,
    clientId: number,
    bonusAmount: number
): Promise<void> {
    const body = buildManualAddBody(clientId, bonusAmount)

    const response = await request.post(manualAddUrl, {
        data: body
    })

    expect(response.status()).toBe(200)

    const responseBody = await response.json() as Types.ManualAddResponseBody

    api.logApiRequest(manualAddUrl, body)
    api.logApiResponse(response, responseBody)

    expect(responseBody.result_code).toBe(0)
}

//Функция построения тела getclientcards
export function buildGetClientCardsBody(clientId: number): Types.GetClientCards {
    return {
        client_id: clientId
    }
}


//Функция построения тела replacecard
export function buildReplaceCardBody(searchMode: 0 | 1, searchValue: string, clientId: number): Types.ReplaceCard {
    return {
        search_mode: searchMode,
        search_value: searchValue,
        client_id: clientId
    }
}

//Функция генерации кода карты из тестового диапазона
export function generateCardCode(): string {
    const firstCardNumber = 99_900_000_000
    const availablePairs = 99_999_999
    const cardNumber = firstCardNumber + Date.now() % availablePairs

    return cardNumber.toString()
}

//Функция построения тела blockcard
export function buildBlockCardBody(card_id: number): Types.BlockCard {
    return {
        card_id: card_id
    }
}

//Функция поиска card_id
export async function searchCardId(request: APIRequestContext,
    phone: string
): Promise<number | null> {
    const body: Types.SearchClientRequestBody = {
        search_mode: 0,
        search_value: phone
    }

    const response = await request.post(searchClientUrl, {
        data: body
    })

    expect(response.status()).toBe(200)

    const responseBody = await response.json() as Types.SearchClientResponseBody

    api.logApiRequest(searchClientUrl, body)
    api.logApiResponse(response, responseBody)

    if (responseBody.card_id === null) {
        return null
    }

    const cardId = Number(responseBody.card_id)

    if (!Number.isSafeInteger(cardId)) {
        throw new Error(
            `Некорректный card_id: ${responseBody.card_id}`
        )
    }

    return cardId
}

//Функция построения тела getconfirmationcode
export function buildGetConfirmationCodeBody(clientId: number, outerSystemsInterfaceType: 5): Types.GetConfirmationCode {
    return {
        client_id: clientId,
        outer_systems_interface_type: outerSystemsInterfaceType
    }
}