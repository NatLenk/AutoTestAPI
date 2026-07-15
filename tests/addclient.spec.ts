import { test, expect, APIRequestContext } from '@playwright/test'
import * as helper from '../helpers/clientHelper'
import * as api from '../api.config'

test('Валидный addclient - добавление клиента', async ({ request }) => {
    const phone = await helper.findUnusedPhone(request)

    const addClientBody = helper.buildAddClientBody(phone, null)

    const addClientResponse = await request.post(helper.addClientUrl, {
        data: addClientBody
    })

    expect(addClientResponse.status()).toBe(200)

    const addClientResponseBody = await addClientResponse.json()

    api.logApiRequest(helper.addClientUrl, addClientBody)
    api.logApiResponse(addClientResponse, addClientResponseBody)

    const createdClientId = await helper.searchClientId(request, phone)

    expect(createdClientId).not.toBeNull()
})

test('Валидный addclient - обновление клиента', async ({ request }) => {
    const { phone, clientId } = await helper.createTestClient(request)

    const updateBody = {
        ...helper.buildAddClientBody(phone, clientId),
        middle_name: 'v2',
        email: `updated${Date.now()}@test.ru`
    }

    const addClientResponse = await request.post(helper.addClientUrl, {
        data: updateBody
    })

    expect(addClientResponse.status()).toBe(200)

    const addClientResponseBody = await addClientResponse.json()

    api.logApiRequest(helper.addClientUrl, updateBody)
    api.logApiResponse(addClientResponse, addClientResponseBody)
})