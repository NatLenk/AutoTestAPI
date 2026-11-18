import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import { getClientCardsResponseSchema } from '../../schemas/сlientSchema'

test('getclientcards - получаем карты клиента', async ({ request }) => {

    const cardCode = clientsHelper.generateCardCode()
    const cardBarcode = cardCode

    const { clientId } = await clientsHelper.createTestClient(request, {
        card_code: cardCode,
        card_barcode: cardBarcode
    })

    const getClientCards = await clientsHelper.getClientCards(request, clientId)
    expect(getClientCards.response.status()).toBe(200)
    getClientCardsResponseSchema.parse(getClientCards.responseBody)
    expect(getClientCards.responseBody.result_code).toBe('0')
    expect(Array.isArray(getClientCards.responseBody.cards)).toBe(true)
    expect(getClientCards.responseBody.cards).toContainEqual(
        expect.objectContaining({ code: cardCode, barcode: cardBarcode })
    )

})
