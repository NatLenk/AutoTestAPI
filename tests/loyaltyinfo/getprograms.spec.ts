import { expect, test } from "@playwright/test";
import * as loyaltyinfoHelper from "../../helpers/loyaltyinfoHelper"
import { getActionsListSchema } from "../../schemas/loyaltyinfoSchema";

test('getprograms - получаем программы лояльности', async ({ request }) => {

    const getPrograms = await loyaltyinfoHelper.getPrograms(request)
    expect(getPrograms.response.status()).toBe(200)
    getActionsListSchema.parse(getPrograms.responseBody)

})