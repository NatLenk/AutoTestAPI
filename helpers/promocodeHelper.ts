import { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

export const searchpromocodeUrl = api.buildLoadUrl('searchpromocode')

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

    const responseBody = response.json()
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

    const responseBody = response.json()
    api.logApiResponse(response, responseBody)

    return {
        body,
        response,
        responseBody
    }

}
//Функция построения тела generate_promocode
export function buildGenerate_PromocodeBody(listId: number): Types.Generate_PromoCode {

    return {
        list_id: listId
    }

}

//Функция отправки запроса generate_promocode
export async function generate_Promocode(request: APIRequestContext, listId: number) {

    const body = buildGenerate_PromocodeBody(listId)

    api.logApiRequest(generate_promocodeUrl, body)
    const response = await request.post(generate_promocodeUrl, {
        data: body
    })

    const responseBody = response.json()
    api.logApiResponse(response, responseBody)

    return {
        body,
        response,
        responseBody
    }

}