import { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

export const goodsUrl = api.buildLoadUrl('goods')

export const goodsListUrl = api.buildLoadUrl('goodslist')

//Функция построения тела goods
export function buildGoodsBody(code: string, name: string, isGroup?: boolean, deleteMark?: boolean, BC?: string[], fullName?: string): Types.Goods {

    return [{

        code,
        name,
        is_group: isGroup,
        delete_mark: deleteMark,
        BC,
        full_name: fullName

    }]
}

//Функция отпраки запроса goods
export async function goods(request: APIRequestContext, code: string, name: string, isGroup?: boolean, deleteMark?: boolean, BC?: string[], fullName?: string) {

    const body = buildGoodsBody(code, name, isGroup, deleteMark, BC, fullName)

    api.logApiRequest(goodsUrl, body)
    const response = await request.post(goodsUrl, {
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

//Функция построения тела goodslist
export function buildGoodsListBody(id: number, inside: Types.Inside[]): Types.GoodsList {

    return [{
        ID: id,
        inside
    }]

}

//Функция отправки запроса goodslist
export async function name(request: APIRequestContext, id: number, inside: Types.Inside[]) {

    const body = buildGoodsListBody(id, inside)

    api.logApiRequest(goodsListUrl, body)
    const response = await request.post(goodsListUrl, {
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