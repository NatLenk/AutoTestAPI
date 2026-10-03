import type { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

// Собираем тело запроса referral
export function buildReferralBody(clientId: number): Types.Referral {

    return {
        client_id: clientId
    }

}

// Отправляем запрос referral
export async function referral(request: APIRequestContext, clientId: number) {

    const body = buildReferralBody(clientId)

    return api.sendApiRequest(request, {
        endpoint: 'referral',
        method: 'POST',
        payload: body
    })

}
