import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as api from '../../api.config'

test('Валидный blockcard', async ({ request }) => {
    const phone = await clientsHelper.findUnusedPhone(request)
    const cardCode = clientsHelper.generateCardCode()
    const cardBarcode = cardCode
    const body = {
        ...clientsHelper.buildAddClientBody(phone, null),
        card_code: cardCode,
        card_barcode: cardBarcode
    }

    const addClientResponse = await request.post(clientsHelper.addClientUrl, {
        data: body
    })

    expect(addClientResponse.status()).toBe(200)

    const cardId = await clientsHelper.searchCardId(request, phone)
    if (cardId === null) {
        throw new Error('Карта не найдена у клиента')
    }

    const blockCardBody = clientsHelper.buildBlockCardBody(cardId)
    const blockCardResponse = await request.post(clientsHelper.blockCardUrl, {
        data: blockCardBody
    })

    expect(blockCardResponse.status()).toBe(200)

    const blockCardResponseBody = await blockCardResponse.json()
    api.logApiRequest(clientsHelper.blockCardUrl, blockCardBody)
    api.logApiResponse(blockCardResponse, blockCardResponseBody)
})