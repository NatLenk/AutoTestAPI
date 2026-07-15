import { test, expect } from '@playwright/test'
import * as api from '../api.config'
import { AddClientRequestBody, GoodsData, SearchClientRequestBody } from '../types/RequestTypes'

type SearchClientResponseBody = {
    state: null | 0 | 1 | 2 | 3 | 4,
    client_id: string | null
}

const searchClientUrl = api.buildLoadUrl('searchclient')
const addClientUrl = api.buildLoadUrl('addclient')

function buildAddClientBody(phone: string, clientId: number | null): AddClientRequestBody {
    return {
        client_id: clientId,
        phone: phone,
        first_name: 'Test',
        last_name: 'Autotest',
        birth_date: '26.03.1999',
        sex: 1,
        email: `autotest${Date.now()}@test.ru`,
        shift_open_dt: api.getLocalDateTime(),
        not_to_send_email: 1,
        not_to_send_sms: 1
    }
}

test('Валидный addclient - добавление клиента', async ({ request }) => {
    const phone = api.generateClientPhone()

    const searchClientBody = {
        search_mode: 0,
        search_value: phone
    }

    const searchClientResponse = await request.post(searchClientUrl, {
        data: searchClientBody
    })

    const searchClientResponseBody = await searchClientResponse.json() as SearchClientResponseBody

    api.logApiRequest(searchClientUrl, searchClientBody)
    api.logApiResponse(searchClientResponse, searchClientResponseBody)

    const addClientBody = buildAddClientBody(phone, Number(searchClientResponseBody.client_id))

    const addClientResponse = await request.post(addClientUrl, {
        data: addClientBody
    })

    expect(addClientResponse.status()).toBe(200)

    const addClientResponseBody = await addClientResponse.json()

    api.logApiRequest(addClientUrl, addClientBody)
    api.logApiResponse(addClientResponse, addClientResponseBody)
})