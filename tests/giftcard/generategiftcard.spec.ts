import { expect, test } from "@playwright/test";
import * as giftcardHelper from "../../helpers/giftcardHelper"

test('generategiftcard - создаём подарочный сертификат', async ({ request }) => {

    const generateGiftCard = await giftcardHelper.generateGiftCard(request)
    expect(generateGiftCard.response.status()).toBe(200)

})
