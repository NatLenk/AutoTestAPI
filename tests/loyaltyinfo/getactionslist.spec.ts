import { expect, test } from "@playwright/test";
import * as loyaltyinfoHelper from "../../helpers/loyaltyinfoHelper"
import * as nomenclatureHelper from "../../helpers/nomenclatureHelper";

test('getactionslist - получаем акции для товара', async ({ request }) => {

    const code = "1234"
    const name = `Тестовый товар для акции ${code}`

    const loadGoods = await nomenclatureHelper.goods(request, true, undefined, undefined, undefined, undefined, { code, name })
    expect(loadGoods.response.status()).toBe(200)

    const getActionsList = await loyaltyinfoHelper.getActionsList(request, null, [code])
    expect(getActionsList.response.status()).toBe(200)

})