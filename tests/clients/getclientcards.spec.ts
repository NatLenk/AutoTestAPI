import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'

test('getclientcards - получаем карты клиента', async ({ request }) => {

    const cardCode = clientsHelper.generateCardCode()
    const cardBarcode = cardCode

    const { clientId } = await clientsHelper.createTestClient(request, {
        card_code: cardCode,
        card_barcode: cardBarcode
    })

    const getClientCards = await clientsHelper.getClientCards(request, clientId)
    expect(getClientCards.response.status()).toBe(200)

})
