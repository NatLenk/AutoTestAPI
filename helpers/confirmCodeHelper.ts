import { expect, APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

export const askconfirmphoneUrl = api.buildLoadUrl('askconfirmphone')
export const checkconfirmphonecodeUrl = api.buildLoadUrl('checkconfirmphonecode')

//Функция построения тела запроса askconfirmphone
export function buildAskConfirmPhoneBody(clientId: number | null, phone: string, overrides: Partial<Types.AskConfirmPhone>): Types.AskConfirmPhone {
    return {
        client_id: clientId,
        phone: phone,
        ...overrides
    }
}

//Функция отправки запроса askconfirmphone
export async function askConfirmPhone(request: APIRequestContext, clientId: number | null, phone: string, overrides: Partial<Types.AskConfirmPhone> = {}) {
    const body = buildAskConfirmPhoneBody(clientId, phone, overrides)

    api.logApiRequest(askconfirmphoneUrl, body)

    const response = await request.post(askconfirmphoneUrl, {
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

//Функция построения тела checkconfirmphonecode
export function buildCheckConfirmPhoneCodeBody(clientId: number | null, phone: string, overrides: Partial<Types.CheckConfirmPhoneCode>): Types.CheckConfirmPhoneCode {
    return {
        client_id: clientId,
        phone: phone,
        ...overrides
    }
}

//Функция отправки запроса checkconfirmphonecode
export async function checkConfirmPhoneCode(request: APIRequestContext, clientId: number | null, phone: string, overrrides: Partial<Types.CheckConfirmPhoneCode> = {}) {
    const body = buildCheckConfirmPhoneCodeBody(clientId, phone, overrrides)

    api.logApiRequest(checkconfirmphonecodeUrl, body)

    const response = await request.post(checkconfirmphonecodeUrl, {
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