import { expect, test } from "@playwright/test";
import * as promocodeHelper from "../../helpers/promocodeHelper"

test('Валидный searchpromocode', async ({ request }) => {

    const generate_Promocode = await promocodeHelper.generate_Promocode(request)
    expect(generate_Promocode.response.status()).toBe(200)
    const promoCode = generate_Promocode.responseBody.promocode

    const searchPromocode = await promocodeHelper.searchPromocode(request, promoCode)
    expect(searchPromocode.response.status()).toBe(200)

})