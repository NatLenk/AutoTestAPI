import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import { replaceCardResponseSchema } from '../../schemas/сlientSchema'

test('replacecard - заменяем карту клиента', async ({ request }) => {

    const cardCode = clientsHelper.generateCardCode()
    const cardBarcode = cardCode
    const { phone, clientId } = await clientsHelper.createTestClient(request, {
        card_code: cardCode,
        card_barcode: cardBarcode
    })

    const searchMode = 1
    const searchValue = await clientsHelper.findUnusedReplacementCard(request)

    const replaceCard = await clientsHelper.replaceCard(request, searchMode, searchValue, clientId)
    expect(replaceCard.response.status()).toBe(200)
    replaceCardResponseSchema.parse(replaceCard.responseBody)
    expect(replaceCard.responseBody.result_code).toBe('0')

})
