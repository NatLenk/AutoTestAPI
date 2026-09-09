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
export function buildAddClientBody(phone: string, clientId: number | null, overrides: Partial<Types.AddClientRequestBody> = {}): Types.AddClientRequestBody {

    return {
        client_id: clientId,
        phone: phone,
        ...overrides
    }

}

//Функция отправки запроса addclient
export async function addClient(request: APIRequestContext, phone: string, clientId: number | null, overrides: Partial<Types.AddClientRequestBody> = {}) {

    const body = buildAddClientBody(phone, clientId, overrides)
    api.logApiRequest(addClientUrl, body)

    const response = await request.post(addClientUrl, {
        data: body
    })

    const responseBody = await response.json()
    api.logApiResponse(response, responseBody)

    return {
        body,
        response,
        responseBody
    }

}

//Функция поиска client_id
export async function searchClientId(request: APIRequestContext, phone: string): Promise<number | null> {

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
export async function findUnusedPhone(request: APIRequestContext): Promise<string> {

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
export async function createTestClient(request: APIRequestContext, overrides: Partial<Types.AddClientRequestBody> = {}): Promise<{ phone: string; clientId: number }> {

    const phone = await findUnusedPhone(request)
    const body = buildAddClientBody(phone, null, overrides)
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
export function buildSearchClientBody(searchMode: 0 | 1 | 2 | 3, searchValue: string, overrides: Partial<Types.SearchClientRequestBody> = {}): Types.SearchClientRequestBody {

    return {
        search_mode: searchMode,
        search_value: searchValue,
        ...overrides
    }

}

//Функция отправки запроса searchclient
export async function searchClient(request: APIRequestContext, searchMode: 0 | 1 | 2 | 3, searchValue: string, overrides: Partial<Types.SearchClientRequestBody> = {}) {

    const body = buildSearchClientBody(searchMode, searchValue, overrides)

    api.logApiRequest(searchClientUrl, body)
    const response = await request.post(searchClientUrl, {
        data: body
    })

    const responseBody = await response.json()
    api.logApiResponse(response, responseBody)

    return {
        body,
        response,
        responseBody
    }

}

//Функция подсчета баланса клиента
export function calculateTotalBalance(items: Types.BalanceItem[]): number {

    return items.reduce((total, item) => {
        return total + Number(item.balance)
    }, 0)

}

//Функция построения тела запроса getclientfullbalance
export function buildGetClientFullBalanceBody(clientId: number): Types.GetClientFullBalanceRequestBody {

    return {
        client_id: clientId
    }

}

//Функция отправки запроса getclientfullbalance
export async function getClientFullBalance(request: APIRequestContext, clientId: number) {

    const body = buildGetClientFullBalanceBody(clientId)

    api.logApiRequest(getClientFullBalanceUrl, body)
    const response = await request.post(getClientFullBalanceUrl, {
        data: body
    })

    const responseBody = await response.json()
    api.logApiResponse(response, responseBody)

    return {
        body,
        response,
        responseBody
    }

}

//Функция построения тела getclientcards
export function buildGetClientCardsBody(clientId: number): Types.GetClientCards {

    return {
        client_id: clientId
    }

}

//Функция отправки запроса getclientcards
export async function getClientCards(request: APIRequestContext, clientId: number) {

    const body = buildGetClientCardsBody(clientId)

    api.logApiRequest(getClientCardsUrl, body)
    const response = await request.post(getClientCardsUrl, {
        data: body
    })

    const responseBody = await response.json()
    api.logApiResponse(response, responseBody)

    return {
        body,
        response,
        responseBody
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


//Функция отправки запроса replacecard
export async function replaceCard(request: APIRequestContext, searchMode: 0 | 1, searchValue: string, clientId: number) {

    const body = buildReplaceCardBody(searchMode, searchValue, clientId)

    api.logApiRequest(replaceCardUrl, body)
    const response = await request.post(replaceCardUrl, {
        data: body
    })

    const responseBody = await response.json()
    api.logApiResponse(response, responseBody)

    return {
        body,
        response,
        responseBody
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
export function buildBlockCardBody(cardId: number): Types.BlockCard {

    return {
        card_id: cardId
    }

}

//Функция отправки запроса blockcard
export async function blockCard(request: APIRequestContext, cardId: number) {

    const body = buildBlockCardBody(cardId)

    api.logApiRequest(blockCardUrl, body)
    const response = await request.post(blockCardUrl, {
        data: body
    })

    const responseBody = await response.json()
    api.logApiResponse(response, responseBody)

    return {
        body,
        response,
        responseBody
    }

}

//Функция построения тела getconfirmationcode
export function buildGetConfirmationCodeBody(clientId: number, outerSystemsInterfaceType: 5): Types.GetConfirmationCode {

    return {
        client_id: clientId,
        outer_systems_interface_type: outerSystemsInterfaceType
    }

}

//Функция отправки запроса getconfirmationcode
export async function getConfirmationCode(request: APIRequestContext, clientId: number, outerSystemsInterfaceType: 5) {

    const body = buildGetConfirmationCodeBody(clientId, outerSystemsInterfaceType)

    api.logApiRequest(getConfirmationCodeUrl, body)
    const response = await request.post(getConfirmationCodeUrl, {
        data: body
    })

    const responseBody = await response.json()
    api.logApiResponse(response, responseBody)

    return {
        body,
        response,
        responseBody
    }

}