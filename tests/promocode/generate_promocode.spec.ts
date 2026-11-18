import { expect, test } from "@playwright/test";
import * as promocodeHelper from "../../helpers/promocodeHelper"
import { generate_promocodeResponseSchema } from '../../schemas/promocodeSchema'

test('generate_promocode - генерация промокода', async ({ request }) => {

    const generate_Promocode = await promocodeHelper.generate_Promocode(request)
    expect(generate_Promocode.response.status()).toBe(200)
    generate_promocodeResponseSchema.parse(generate_Promocode.responseBody)

})