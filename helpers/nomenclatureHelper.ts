import type { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'
import { randomUUID } from 'node:crypto'
import { environmentConfig } from '../environment.config'

// Собираем тело запроса goods
export function buildGoodsBody(isGroup?: boolean, deleteMark?: boolean, BC?: string[], fullName?: string, overrides: Partial<Types.Goods[number]> = {}): Types.Goods {

    const code = generateGoodsCode()

    return [{
        code,
        name: `Тестовый товар ${code}`,
        is_group: isGroup,
        delete_mark: deleteMark,
        BC,
        full_name: fullName,
        ...overrides
    }]
}

// Отправляем запрос goods
export async function goods(request: APIRequestContext, partial: boolean, isGroup?: boolean, deleteMark?: boolean, BC?: string[], fullName?: string, overrides: Partial<Types.Goods[number]> = {}) {

    const body = buildGoodsBody(isGroup, deleteMark, BC, fullName, overrides)

    if (!partial && !body.some(good => good.code === '1234')) {
        body.push({
            code: '1234',
            name: 'Тестовый товар для акции 1234'
        })
    }

    return api.sendApiRequest(request, {
        endpoint: 'goods',
        method: 'POST',
        payload: body,
        params: partial ? { partial: 1 } : {},
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// Собираем тело запроса goodslist
export function buildGoodsListBody(inside: Types.Inside[]): Types.GoodsList {

    return [{
        ID: environmentConfig.goodsGroupId,
        inside
    }]

}

// Отправляем запрос goodslist
export async function goodsList(request: APIRequestContext, inside: Types.Inside[]) {

    const body = buildGoodsListBody(inside)

    return api.sendApiRequest(request, {
        endpoint: 'goodslist',
        method: 'POST',
        payload: body
    })

}

// Генерируем код товара
export function generateGoodsCode() {

    return randomUUID()

}
