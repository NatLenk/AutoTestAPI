import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as api from '../../api.config'

test('Валидный getconfirmationcode', async ({ request }) => {
    const phone = await clientsHelper.findUnusedPhone(request)
    const body = {
        ...clientsHelper.buildAddClientBody(phone, null)
    }

    const addClientResponse = await request.post(clientsHelper.addClientUrl, {
        data: body
    })

    expect(addClientResponse.status()).toBe(200)

    const clientId = await clientsHelper.searchClientId(request, phone)
    if (clientId === null) {
        throw new Error('Созданный клиент не найден')
    }

    const outerSystemsInterfaceType = 5
    const getConfirmationCodeBody = clientsHelper.buildGetConfirmationCodeBody(clientId, outerSystemsInterfaceType)
    const getConfirmationCodeResponse = await request.post(clientsHelper.getConfirmationCodeUrl, {
        data: getConfirmationCodeBody
    })

    expect(getConfirmationCodeResponse.status()).toBe(200)

    const getConfirmationCodeResponseBody = await getConfirmationCodeResponse.json()
    api.logApiRequest(clientsHelper.getConfirmationCodeUrl, getConfirmationCodeBody)
    api.logApiResponse(getConfirmationCodeResponse, getConfirmationCodeResponseBody)
})