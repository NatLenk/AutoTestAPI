import { expect, APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

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

    return api.sendApiRequest(request, {
        endpoint: 'addclient',
        method: 'POST',
        payload: body
    })

}

//Функция поиска client_id
export async function searchClientId(request: APIRequestContext, phone: string): Promise<number | null> {

    const { response, responseBody } = await searchClient(request, 0, phone)
    expect(response.status()).toBe(200)

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
    const { response } = await addClient(request, phone, null, overrides)
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

    return api.sendApiRequest<
        Types.SearchClientRequestBody,
        Types.SearchClientResponseBody
    >(request, {
        endpoint: 'searchclient',
        method: 'POST',
        payload: body
    })

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

    return api.sendApiRequest<
        Types.GetClientFullBalanceRequestBody,
        Types.BalanceItem[]
    >(request, {
        endpoint: 'getclientfullbalance',
        method: 'POST',
        payload: body
    })

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

    return api.sendApiRequest(request, {
        endpoint: 'getclientcards',
        method: 'POST',
        payload: body
    })

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

    return api.sendApiRequest<
        Types.ReplaceCard,
        Types.ReplaceCardResponseBody
    >(request, {
        endpoint: 'replacecard',
        method: 'POST',
        payload: body
    })

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

    return api.sendApiRequest<Types.BlockCard, Types.BlockCardResponseBody>(request, {
        endpoint: 'blockcard',
        method: 'POST',
        payload: body
    })

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

    return api.sendApiRequest(request, {
        endpoint: 'getconfirmationcode',
        method: 'POST',
        payload: body
    })

}
