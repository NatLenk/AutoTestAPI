import { expect, test } from "@playwright/test";
import * as promocodeHelper from "../../helpers/promocodeHelper"

test('Валидный reservedpromocode', async ({ request }) => {

    const generate_Promocode = await promocodeHelper.generate_Promocode(request)
    expect(generate_Promocode.response.status()).toBe(200)
    const promoCode = generate_Promocode.responseBody.promocode

    const reservedpromocode = await promocodeHelper.reservedPromocode(request, promoCode, true)
    expect(reservedpromocode.response.status()).toBe(200)

})