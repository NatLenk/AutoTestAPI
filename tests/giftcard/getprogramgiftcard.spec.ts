import { expect, test } from "@playwright/test";
import * as giftcardHelper from "../../helpers/giftcardHelper"

test('Валидный getprogramgiftcard', async ({ request }) => {

    const getProgramGiftCard = await giftcardHelper.getProgramGiftCard(request)
    expect(getProgramGiftCard.response.status()).toBe(200)

})
