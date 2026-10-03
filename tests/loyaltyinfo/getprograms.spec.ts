import { expect, test } from "@playwright/test";
import * as loyaltyinfoHelper from "../../helpers/loyaltyinfoHelper"

test('getprograms - получаем программы лояльности', async ({ request }) => {

    const getPrograms = await loyaltyinfoHelper.getPrograms(request)
    expect(getPrograms.response.status()).toBe(200)

})