import { test, expect } from '@playwright/test'
import * as helper from '../../helpers/clientsHelper'
import * as api from '../../api.config'

test('Валидный blockcard', async ({ request }) => {
    const phone = await helper.findUnusedPhone(request)
    const cardCode = helper.generateCardCode()
    const cardBarcode = cardCode
    const body = {
        ...helper.buildAddClientBody(phone, null),
        card_code: cardCode,
        card_barcode: cardBarcode
    }

    const addClientResponse = await request.post(helper.addClientUrl, {
        data: body
    })

    expect(addClientResponse.status()).toBe(200)

    const cardId = await helper.searchCardId(request, phone)
    if (cardId === null) {
        throw new Error('Карта не найдена у клиента')
    }

    const blockCardBody = helper.buildBlockCardBody(cardId)
    const blockCardResponse = await request.post(helper.blockCardUrl, {
        data: blockCardBody
    })

    expect(blockCardResponse.status()).toBe(200)

    const blockCardResponseBody = await blockCardResponse.json()
    api.logApiRequest(helper.blockCardUrl, blockCardBody)
    api.logApiResponse(blockCardResponse, blockCardResponseBody)
})