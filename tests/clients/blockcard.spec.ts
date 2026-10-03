import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'

test('blockcard - блокируем карту клиента', async ({ request }) => {

    const cardCode = clientsHelper.generateCardCode()
    const cardBarcode = cardCode
    const { phone } = await clientsHelper.createTestClient(request, {
        card_code: cardCode,
        card_barcode: cardBarcode
    }) 

    const searchClient = await clientsHelper.searchClient(request, 0, phone)
    expect(searchClient.response.status()).toBe(200)

    const rawCardId = searchClient.responseBody.card_id
    if (rawCardId === null) {
        throw new Error('У клиента не нашли карту')
    }

    const cardId = Number(rawCardId)
    expect(Number.isSafeInteger(cardId)).toBe(true)

    const blockCard = await clientsHelper.blockCard(request, cardId)
    expect(blockCard.response.status()).toBe(200)

})
