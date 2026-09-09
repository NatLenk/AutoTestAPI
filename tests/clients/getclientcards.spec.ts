import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as api from '../../api.config'

test('Валидный getclientcards', async ({ request }) => {
    const phone = await clientsHelper.findUnusedPhone(request)
    const cardCode = `999${Date.now()}`
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

    const clientId = await clientsHelper.searchClientId(request, phone)
    if (clientId === null) {
        throw new Error('Созданный клиент не найден')
    }

    const getClientCardsBody = clientsHelper.buildGetClientCardsBody(clientId)
    const getClientCardsResponse = await request.post(clientsHelper.getClientCardsUrl, {
        data: getClientCardsBody
    })
    expect(getClientCardsResponse.status()).toBe(200)

    const getClientCardsResponseBody = await getClientCardsResponse.json()
    api.logApiRequest(clientsHelper.getClientCardsUrl, getClientCardsBody)
    api.logApiResponse(getClientCardsResponse, getClientCardsResponseBody)

})