import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'

test('Валидный searchclient - поиск без клиента', async ({ request }) => {

    const phone = clientsHelper.generateClientPhone()
    const searchClient = await clientsHelper.searchClient(request, 0, phone)
    expect(searchClient.response.status()).toBe(200)

})

/*test('Невалидный searchclient', async ({ request }) => {
    const invalidBody = buildSearchClientBody(generateSearchClientPhone()) as any
    invalidBody.search_mode = 999
    const response = await request.post(searchClientUrl, {
        data: invalidBody
    })
    const responseBody = await response.json()
    api.logApiRequest(searchClientUrl, invalidBody)
    api.logApiResponse(response, responseBody)
})*/