import type { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

//Функция построения тела запроса referral
export function buildReferralBody(clientId: number): Types.Referral {

    return {
        client_id: clientId
    }

}

//Функция отправки запроса referral
export async function referral(request: APIRequestContext, clientId: number) {

    const body = buildReferralBody(clientId)

    return api.sendApiRequest(request, {
        endpoint: 'referral',
        method: 'POST',
        payload: body
    })

}
