import { test, expect } from "@playwright/test"
import * as nomenclatureHelper from '../../helpers/nomenclatureHelper'
import { goodsSchema } from "../../schemas/nomenclatureSchema"

test('goods - отправляем полную загрузку товаров', async ({ request }) => {

    const goods = await nomenclatureHelper.goods(request, false)
    expect(goods.response.status()).toBe(200)
    goodsSchema.parse(goods.responseBody)

})

test('goods - отправляем частичную загрузку товаров', async ({ request }) => {

    const goods = await nomenclatureHelper.goods(request, true)
    expect(goods.response.status()).toBe(200)
    goodsSchema.parse(goods.responseBody)

})