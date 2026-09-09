import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'

test('Валидный getclientcards', async ({ request }) => {

    const cardCode = `999${Date.now()}`
    const cardBarcode = cardCode

    const { clientId } = await clientsHelper.createTestClient(request, {
        card_code: cardCode,
        card_barcode: cardBarcode
    })

    const getClientCards = await clientsHelper.getClientCards(request, clientId)
    expect(getClientCards.response.status()).toBe(200)

})