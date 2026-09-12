import { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

export const getActionsListUrl = api.buildLoadUrl('getactionslist')

export const getProgramsUrl = api.buildLoadUrl('getprograms')

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

    api.logApiRequest(getActionsListUrl, body)
    const response = await request.post(getActionsListUrl, {
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

//Функция построения тела getprograms
export function buildGetProgramsBody(): Types.GetPrograms {

    return {

    }

}

//Функция отправки запроса getprograms
export async function getPrograms(request: APIRequestContext) {

    const body = buildGetProgramsBody()

    api.logApiRequest(getProgramsUrl, body)
    const response = await request.post(getProgramsUrl, body)

    const responseBody = await response.json()
    api.logApiResponse(response, responseBody)

    return {
        body,
        response,
        responseBody
    }

}