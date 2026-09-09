import { expect, test } from "@playwright/test";
import * as promocodeHelper from "../../helpers/promocodeHelper"

test('Валидный generate_promocode', async ({ request }) => {

    const generate_Promocode = await promocodeHelper.generate_Promocode(request)
    expect(generate_Promocode.response.status()).toBe(200)

})