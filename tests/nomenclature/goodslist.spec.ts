import { test, expect } from "@playwright/test"
import * as nomenclatureHelper from '../../helpers/nomenclatureHelper'

test('goodslist - добавляем товар в группу', async ({ request }) => {

    test.setTimeout(120_000)

    const loadGoods = await nomenclatureHelper.goods(request, true)
    expect(loadGoods.response.status()).toBe(200)
    await new Promise(resolve => setTimeout(resolve, 60_000))


    const code = loadGoods.body[0].code
    const goodsList = await nomenclatureHelper.goodsList(request, [{ code }])
    expect(goodsList.response.status()).toBe(200)

})