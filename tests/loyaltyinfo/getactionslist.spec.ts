import { expect, test } from "@playwright/test";
import * as loyaltyinfoHelper from "../../helpers/loyaltyinfoHelper"
import { buildGoodsData } from "../../helpers/clientsHelper";

test('Валидный getactionslist', async ({ request }) => {

    const getActionsList = await loyaltyinfoHelper.getActionsList(request, null, buildGoodsData)
    expect(getActionsList.response.status()).toBe(200)

})