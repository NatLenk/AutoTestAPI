import { test, expect } from "@playwright/test"
import * as nomenclatureHelper from '../../helpers/nomenclatureHelper'

test('Валидный goods полная загрузка', async ({ request }) => {

    const goods = await nomenclatureHelper.goods(request, false)
    expect(goods.response.status()).toBe(200)

})

test('Валидный goods частичная загрузка', async ({ request }) => {

    const goods = await nomenclatureHelper.goods(request, true)
    expect(goods.response.status()).toBe(200)

})