import { test, expect } from '@playwright/test'
import * as helper from '../../helpers/clientsHelper'
import * as api from '../../api.config'

test('Валидный getconfirmationcode', async ({ request }) => {
    const phone = await helper.findUnusedPhone(request)
    const body = {
        ...helper.buildAddClientBody(phone, null)
    }

    const addClientResponse = await request.post(helper.addClientUrl, {
        data: body
    })

    expect(addClientResponse.status()).toBe(200)

    const clientId = await helper.searchClientId(request, phone)
    if (clientId === null) {
        throw new Error('Созданный клиент не найден')
    }

    const outerSystemsInterfaceType = 5
    const getConfirmationCodeBody = helper.buildGetConfirmationCodeBody(clientId, outerSystemsInterfaceType)
    const getConfirmationCodeResponse = await request.post(helper.getConfirmationCodeUrl, {
        data: getConfirmationCodeBody
    })

    expect(getConfirmationCodeResponse.status()).toBe(200)

    const getConfirmationCodeResponseBody = await getConfirmationCodeResponse.json()
    api.logApiRequest(helper.getConfirmationCodeUrl, getConfirmationCodeBody)
    api.logApiResponse(getConfirmationCodeResponse, getConfirmationCodeResponseBody)
})