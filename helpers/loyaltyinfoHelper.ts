import type { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

//Функция построения тела getactionslist
export function buildGetActionsListBody(tradeObjectId: number | null, goods: string[]): Types.GetActionsList {

    return {
        trade_object_id: tradeObjectId,
        goods
    }

}

//Функция отправки запроса getactionslist
export async function getActionsList(request: APIRequestContext, tradeObjectId: number | null, goods: string[]) {

    const body = buildGetActionsListBody(tradeObjectId, goods)

    return api.sendApiRequest(request, {
        endpoint: 'getactionslist',
        method: 'POST',
        payload: body
    })

}

//Функция построения тела getprograms
export function buildGetProgramsBody(): Types.GetPrograms {

    return {

    }

}

//Функция отправки запроса getprograms
export async function getPrograms(request: APIRequestContext) {

    const body = buildGetProgramsBody()

    return api.sendApiRequest(request, {
        endpoint: 'getprograms',
        method: 'POST',
        payload: body
    })

}
