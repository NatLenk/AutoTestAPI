import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'

test('Валидный replacecard', async ({ request }) => {

    const cardCode = clientsHelper.generateCardCode()
    const cardBarcode = cardCode
    const { clientId } = await clientsHelper.createTestClient(request, {
        card_code: cardCode,
        card_barcode: cardBarcode
    })

    const searchMode = 0
    const searchValue = (Number(cardCode) + 1).toString()

    const replaceCard = await clientsHelper.replaceCard(request, searchMode, searchValue, clientId)
    expect(replaceCard.response.status()).toBe(200)

})
