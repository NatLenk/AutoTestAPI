import { test, expect } from '@playwright/test'
import * as helper from '../../helpers/clientsHelper'
import * as api from '../../api.config'

test('Валидный getclientcards', async ({ request }) => {
    const phone = await helper.findUnusedPhone(request)
    const cardCode = `999${Date.now()}`
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

    const clientId = await helper.searchClientId(request, phone)
    if (clientId === null) {
        throw new Error('Созданный клиент не найден')
    }

    const getClientCardsBody = helper.buildGetClientCardsBody(clientId)
    const getClientCardsResponse = await request.post(helper.getClientCardsUrl, {
        data: getClientCardsBody
    })
    expect(getClientCardsResponse.status()).toBe(200)

    const getClientCardsResponseBody = await getClientCardsResponse.json()
    api.logApiRequest(helper.getClientCardsUrl, getClientCardsBody)
    api.logApiResponse(getClientCardsResponse, getClientCardsResponseBody)

})