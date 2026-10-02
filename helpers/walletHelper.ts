import type { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

//Функция построения тела запроса getwalletlink
export function buildGetWalletLinkBody(clientId: number): Types.GetWalletLink {

    return {
        client_id: clientId
    }

}

//Функция отправки запроса getwalletlink
export async function getWalletLink(request: APIRequestContext, clientId: number) {

    const body = buildGetWalletLinkBody(clientId)

    return api.sendApiRequest<Types.GetWalletLink, string>(request, {
        endpoint: 'getwalletlink',
        method: 'POST',
        payload: body,
        responseType: 'text'
    })

}
