import type { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

// Собираем тело запроса searchpromocode
export function buildSearchPromocodeBody(promoCode: string): Types.SearchPromoCode {

    return {
        promo_code: promoCode
    }

}

// Отправляем запрос searchpromocode
export async function searchPromocode(request: APIRequestContext, promoCode: string) {

    const body = buildSearchPromocodeBody(promoCode)

    return api.sendApiRequest(request, {
        endpoint: 'searchpromocode',
        method: 'POST',
        payload: body
    })

}

// Собираем тело запроса getclientpromocodes
export function buildGetClientPromocodesBody(clientId: number, activeOnly?: boolean | null): Types.GetClientPromocodes {

    return {
        client_id: clientId,
        active_only: activeOnly
    }

}

// Отправляем запрос getclientpromocodes
export async function getClientPromocodes(request: APIRequestContext, clientId: number, activeOnly?: boolean | null) {

    const body = buildGetClientPromocodesBody(clientId, activeOnly)

    return api.sendApiRequest(request, {
        endpoint: 'getclientpromocodes',
        method: 'POST',
        payload: body
    })

}

// Собираем тело запроса reservedpromocode
export function buildReservedPromocodeBody(promoCode: string, setReserved: true | false): Types.ReservedPromoCode {

    return {
        promo_code: promoCode,
        set_reserved: setReserved
    }

}

// Отправляем запрос reservedpromocode
export async function reservedPromocode(request: APIRequestContext, promoCode: string, setReserved: true | false) {

    const body = buildReservedPromocodeBody(promoCode, setReserved)

    return api.sendApiRequest(request, {
        endpoint: 'reservedpromocode',
        method: 'POST',
        payload: body
    })

}
// Собираем тело запроса generate_promocode
export function buildGenerate_PromocodeBody(clientId?: number | null): Types.Generate_PromoCode {

    return {
        client_id: clientId,
        list_id: 7254
    }

}

// Отправляем запрос generate_promocode
export async function generate_Promocode(request: APIRequestContext, clientId?: number | null) {

    const body = buildGenerate_PromocodeBody(clientId)

    return api.sendApiRequest<Types.Generate_PromoCode, Types.GeneratePromoCodeResponseBody>(request, {
        endpoint: 'generate_promocode',
        method: 'POST',
        payload: body
    })

}

// Получаем промокод из диапазона для тестов
export function generatePromocode(): string {

    const firstPromocodeNumber = 99_900_000_000

    const availablePairs = 99_999_999

    const promocodeNumber = firstPromocodeNumber + Date.now() % availablePairs

    return promocodeNumber.toString()

}
