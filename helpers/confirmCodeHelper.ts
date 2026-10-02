import type { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

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

    return api.sendApiRequest(request, {
        endpoint: 'askconfirmphone',
        method: 'POST',
        payload: body
    })

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
export async function checkConfirmPhoneCode(request: APIRequestContext, clientId: number | null, phone: string, overrides: Partial<Types.CheckConfirmPhoneCode> = {}) {

    const body = buildCheckConfirmPhoneCodeBody(clientId, phone, overrides)

    return api.sendApiRequest(request, {
        endpoint: 'checkconfirmphonecode',
        method: 'POST',
        payload: body
    })

}
