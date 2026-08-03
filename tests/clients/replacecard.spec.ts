import { test, expect } from '@playwright/test'
import * as helper from '../../helpers/clientsHelper'
import * as api from '../../api.config'

test('Валидный replacecard', async ({ request }) => {
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

    const clientId = await helper.searchClientId(request, phone)
    if (clientId === null) {
        throw new Error('Созданный клиент не найден')
    }

    const searchMode = 0
    const searchValue = (Number(cardCode) + 1).toString()
    const replaceCardBody = await helper.buildReplaceCardBody(searchMode, searchValue, clientId)
    const replaceCardResponse = await request.post(helper.replaceCardUrl, {
        data: replaceCardBody
    })
    expect(replaceCardResponse.status()).toBe(200)

    const replaceCardResponceBody = await replaceCardResponse.json()
    api.logApiRequest(helper.replaceCardUrl, replaceCardBody)
    api.logApiResponse(replaceCardResponse, replaceCardResponceBody)
})
