import { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

export const searchpromocodeUrl = api.buildLoadUrl('searchpromocode')

export const getclientpromocodesUrl = api.buildLoadUrl('getclientpromocodes')

export const reservedpromocodeUrl = api.buildLoadUrl('reservedpromocode')

export const generate_promocodeUrl = api.buildLoadUrl('generate_promocode')

//Функция построения тела searchpromocode
export function buildSearchPromocodeBody(promoCode: string): Types.SearchPromoCode {

    return {
        promo_code: promoCode
    }

}

//Функция отправки запроса searchpromocode
export async function searchPromocode(request: APIRequestContext, promoCode: string) {

    const body = buildSearchPromocodeBody(promoCode)

    api.logApiRequest(searchpromocodeUrl, body)
    const response = await request.post(searchpromocodeUrl, {
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

//Функция построения тела getclientpromocodes
export function buildGetClientPromocodesBody(clientId: number, activeOnly?: boolean | null): Types.GetClientPromocodes {

    return {
        client_id: clientId,
        active_only: activeOnly
    }

}

//Функция отправки запроса getclientpromocodes
export async function getClientPromocodes(request: APIRequestContext, clientId: number, activeOnly?: boolean | null) {

    const body = buildGetClientPromocodesBody(clientId, activeOnly)

    api.logApiRequest(getclientpromocodesUrl, body)
    const response = await request.post(getclientpromocodesUrl, {
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

//Функция построения тела reservedpromocode
export function buildReservedPromocodeBody(promoCode: string, setReserved: true | false): Types.ReservedPromoCode {

    return {
        promo_code: promoCode,
        set_reserved: setReserved
    }

}

//Функция отправки запроса reservedpromocode
export async function reservedPromocode(request: APIRequestContext, promoCode: string, setReserved: true | false) {

    const body = buildReservedPromocodeBody(promoCode, setReserved)

    api.logApiRequest(reservedpromocodeUrl, body)
    const response = await request.post(reservedpromocodeUrl, {
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
//Функция построения тела generate_promocode
export function buildGenerate_PromocodeBody(clientId?: number | null): Types.Generate_PromoCode {

    return {
        client_id: clientId,
        list_id: 999
    }

}

//Функция отправки запроса generate_promocode
export async function generate_Promocode(request: APIRequestContext, clientId?: number | null) {

    const body = buildGenerate_PromocodeBody(clientId)

    api.logApiRequest(generate_promocodeUrl, body)
    const response = await request.post(generate_promocodeUrl, {
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

//Функция генерации промокода из тестового диапазона
export function generatePromocode(): string {

    const firstPromocodeNumber = 99_900_000_000

    const availablePairs = 99_999_999

    const promocodeNumber = firstPromocodeNumber + Date.now() % availablePairs

    return promocodeNumber.toString()

}