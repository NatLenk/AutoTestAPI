import { expect, test } from "@playwright/test";
import * as giftcardHelper from "../../helpers/giftcardHelper"
import { generateGiftCardSchema } from "../../schemas/giftcardSchema";

test('generategiftcard - создаём подарочный сертификат', async ({ request }) => {

    const generateGiftCard = await giftcardHelper.generateGiftCard(request)
    expect(generateGiftCard.response.status()).toBe(200)
    generateGiftCardSchema.parse(generateGiftCard.responseBody)

})
