import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import { searchClientResponseSchema } from '../../schemas/сlientSchema'

test('searchclient - поиск клиента', async ({ request }) => {

    const phone = clientsHelper.generateClientPhone()
    const searchClient = await clientsHelper.searchClient(request, 0, phone)
    expect(searchClient.response.status()).toBe(200)
    searchClientResponseSchema.parse(searchClient.responseBody)

})