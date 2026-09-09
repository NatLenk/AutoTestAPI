import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as api from '../../api.config'

test('Валидный replacecard', async ({ request }) => {
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

    const clientId = await clientsHelper.searchClientId(request, phone)
    if (clientId === null) {
        throw new Error('Созданный клиент не найден')
    }

    const searchMode = 0
    const searchValue = (Number(cardCode) + 1).toString()
    const replaceCardBody = await clientsHelper.buildReplaceCardBody(searchMode, searchValue, clientId)
    const replaceCardResponse = await request.post(clientsHelper.replaceCardUrl, {
        data: replaceCardBody
    })
    expect(replaceCardResponse.status()).toBe(200)

    const replaceCardResponceBody = await replaceCardResponse.json()
    api.logApiRequest(clientsHelper.replaceCardUrl, replaceCardBody)
    api.logApiResponse(replaceCardResponse, replaceCardResponceBody)
})
