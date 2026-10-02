import type { APIRequestContext } from '@playwright/test'
import { randomInt } from 'node:crypto'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

//Функция построения тела запроса closesession
export function buildCloseSessionBody(cashPaymentAmount: number, cardPaymentAmount: number, overrides: Partial<Types.CloseSession> = {}): Types.CloseSession {

    const [time, date] = api.getLocalDateTime().split(' ')

    return {
        payments: [
            { payment_amount: cashPaymentAmount, type: 0 },
            { payment_amount: cardPaymentAmount, type: 1 }
        ],
        shift_close_dt: `${date} ${time}`,
        shift_number: randomInt(1, 2_147_483_647),
        ...overrides
    }

}

//Функция отправки запроса closesession
export async function closeSession(request: APIRequestContext, cashPaymentAmount: number, cardPaymentAmount: number, overrides: Partial<Types.CloseSession> = {}) {

    const body = buildCloseSessionBody(cashPaymentAmount, cardPaymentAmount, overrides)

    return api.sendApiRequest<Types.CloseSession, string>(request, {
        endpoint: 'closesession',
        method: 'POST',
        payload: body,
        responseType: 'text'
    })

}

//Функция построения тела запроса exchangepossettings
export function buildExchangePosSettingsBody(posProgram: string, version: string, autoupdate?: 0 | 1): Types.ExchangePosSettings {

    return {
        pos_program: posProgram,
        version,
        ...(autoupdate === undefined ? {} : { autoupdate })
    }

}

//Функция отправки запроса exchangepossettings
export async function exchangePosSettings(request: APIRequestContext, posProgram: string, version: string, autoupdate?: 0 | 1) {

    const body = buildExchangePosSettingsBody(posProgram, version, autoupdate)

    return api.sendApiRequest<Types.ExchangePosSettings, string>(request, {
        endpoint: 'exchangepossettings',
        method: 'POST',
        payload: body,
        responseType: 'text'
    })

}

//Функция построения тела запроса generatecard
export function buildGenerateCardBody(clientId: number): Types.GenerateCard {

    return {
        client_id: clientId,
        outer_systems_interface_type: 4
    }

}

//Функция отправки запроса generatecard
export async function generateCard(request: APIRequestContext, clientId: number) {

    const body = buildGenerateCardBody(clientId)

    return api.sendApiRequest<Types.GenerateCard, string>(request, {
        endpoint: 'generatecard',
        method: 'POST',
        payload: body,
        responseType: 'text'
    })

}

//Функция отправки запроса legal_info (GET без тела)
export async function legalInfo(request: APIRequestContext) {

    return api.sendApiRequest<undefined, string>(request, {
        endpoint: 'legal_info',
        method: 'GET',
        payload: undefined,
        responseType: 'text'
    })

}
