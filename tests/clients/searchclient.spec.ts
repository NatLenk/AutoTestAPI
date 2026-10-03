import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'

test('searchclient - поиск клиента', async ({ request }) => {

    const phone = clientsHelper.generateClientPhone()
    const searchClient = await clientsHelper.searchClient(request, 0, phone)
    expect(searchClient.response.status()).toBe(200)

})