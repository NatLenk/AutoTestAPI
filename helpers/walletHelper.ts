import type { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

// Собираем тело запроса getwalletlink
export function buildGetWalletLinkBody(clientId: number): Types.GetWalletLink {

    return {
        client_id: clientId
    }

}

// Отправляем запрос getwalletlink
export async function getWalletLink(request: APIRequestContext, clientId: number) {

    const body = buildGetWalletLinkBody(clientId)

    return api.sendApiRequest<Types.GetWalletLink, string>(request, {
        endpoint: 'getwalletlink',
        method: 'POST',
        payload: body,
        responseType: 'text'
    })

}
