import { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'
import { randomUUID } from 'node:crypto'

export const goodsUrl = api.buildLoadUrl('goods')

export const goodsListUrl = api.buildLoadUrl('goodslist')

//Функция построения тела goods
export function buildGoodsBody(isGroup?: boolean, deleteMark?: boolean, BC?: string[], fullName?: string, overrides: Partial<Types.Goods[number]> = {}): Types.Goods {

    const code = generateGoodsCode()

    return [{
        code,
        name: `Товар из автотеста ${code}`,
        is_group: isGroup,
        delete_mark: deleteMark,
        BC,
        full_name: fullName,
        ...overrides
    }]
}

//Функция отпраки запроса goods
export async function goods(request: APIRequestContext, partial: boolean, isGroup?: boolean, deleteMark?: boolean, BC?: string[], fullName?: string, overrides: Partial<Types.Goods[number]> = {}) {

    const body = buildGoodsBody(isGroup, deleteMark, BC, fullName, overrides)

    api.logApiRequest(goodsUrl, body)
    const response = await request.post(goodsUrl, {
        params: partial ? { partial: 1 } : {},
        headers: {
            'Content-Type': 'application/json'
        },
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
export function buildGoodsListBody(inside: Types.Inside[]): Types.GoodsList {

    return [{
        ID: 999,
        inside
    }]

}

//Функция отправки запроса goodslist
export async function goodsList(request: APIRequestContext, inside: Types.Inside[]) {

    const body = buildGoodsListBody(inside)

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

//Функцция генерации code в товаре
export function generateGoodsCode() {

    return randomUUID()

}