import { expect, test } from "@playwright/test";
import * as giftcardHelper from "../../helpers/giftcardHelper"

test('Валидный searchgiftcard', async ({ request }) => {

    const generateGiftCard = await giftcardHelper.generateGiftCard(request)
    expect(generateGiftCard.response.status()).toBe(200)
    const barcode = generateGiftCard.responseBody.gc_barcode

    const searchGiftCard = await giftcardHelper.searchGiftCard(request, barcode)
    expect(searchGiftCard.response.status()).toBe(200)

})
