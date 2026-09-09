import { test, expect, APIRequestContext } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as api from '../../api.config'

test('Валидный addclient - добавление клиента', async ({ request }) => {
    const phone = await clientsHelper.findUnusedPhone(request)

    const addClientBody = clientsHelper.buildAddClientBody(phone, null)

    const addClientResponse = await request.post(clientsHelper.addClientUrl, {
        data: addClientBody
    })

    expect(addClientResponse.status()).toBe(200)

    const addClientResponseBody = await addClientResponse.json()

    api.logApiRequest(clientsHelper.addClientUrl, addClientBody)
    api.logApiResponse(addClientResponse, addClientResponseBody)

    const createdClientId = await clientsHelper.searchClientId(request, phone)

    expect(createdClientId).not.toBeNull()
})

test('Валидный addclient - обновление клиента', async ({ request }) => {
    const { phone, clientId } = await clientsHelper.createTestClient(request)

    const updateBody = {
        ...clientsHelper.buildAddClientBody(phone, clientId),
        middle_name: 'v2',
        email: `updated${Date.now()}@test.ru`
    }

    const addClientResponse = await request.post(clientsHelper.addClientUrl, {
        data: updateBody
    })

    expect(addClientResponse.status()).toBe(200)

    const addClientResponseBody = await addClientResponse.json()

    api.logApiRequest(clientsHelper.addClientUrl, updateBody)
    api.logApiResponse(addClientResponse, addClientResponseBody)
})