import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import { addClientResponseSchema } from '../../schemas/сlientSchema'

test('addclient - добавляем нового клиента', async ({ request }) => {

    const phone = await clientsHelper.findUnusedPhone(request)

    const addClient = await clientsHelper.addClient(request, phone, null)
    expect(addClient.response.status()).toBe(200)
    addClientResponseSchema.parse(addClient.responseBody)
    expect(addClient.responseBody.result_code).toBe('0')

})

test('addclient - обновляем данные клиента', async ({ request }) => {

    const { phone, clientId } = await clientsHelper.createTestClient(request, {
        middle_name: 'v1',
        email: 'initial@test.ru'
    })

    const updateBody = {

        middle_name: 'v2',
        email: `updated${Date.now()}@test.ru`

    }

    const addClient = await clientsHelper.addClient(request, phone, clientId, updateBody)
    expect(addClient.response.status()).toBe(200)
    addClientResponseSchema.parse(addClient.responseBody)
    expect(addClient.responseBody.result_code).toBe('0')

})