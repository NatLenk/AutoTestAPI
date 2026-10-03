import type { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

// Собираем тело запроса askconfirmphone
export function buildAskConfirmPhoneBody(clientId: number | null, phone: string, overrides: Partial<Types.AskConfirmPhone>): Types.AskConfirmPhone {

    return {
        client_id: clientId,
        phone: phone,
        ...overrides
    }

}

// Отправляем запрос askconfirmphone
export async function askConfirmPhone(request: APIRequestContext, clientId: number | null, phone: string, overrides: Partial<Types.AskConfirmPhone> = {}) {

    const body = buildAskConfirmPhoneBody(clientId, phone, overrides)

    return api.sendApiRequest(request, {
        endpoint: 'askconfirmphone',
        method: 'POST',
        payload: body
    })

}

// Собираем тело запроса checkconfirmphonecode
export function buildCheckConfirmPhoneCodeBody(clientId: number | null, phone: string, overrides: Partial<Types.CheckConfirmPhoneCode>): Types.CheckConfirmPhoneCode {

    return {
        client_id: clientId,
        phone: phone,
        ...overrides
    }

}

// Отправляем запрос checkconfirmphonecode
export async function checkConfirmPhoneCode(request: APIRequestContext, clientId: number | null, phone: string, overrides: Partial<Types.CheckConfirmPhoneCode> = {}) {

    const body = buildCheckConfirmPhoneCodeBody(clientId, phone, overrides)

    return api.sendApiRequest(request, {
        endpoint: 'checkconfirmphonecode',
        method: 'POST',
        payload: body
    })

}
