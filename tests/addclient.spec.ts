import { test, expect, APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import { AddClientRequestBody, SearchClientRequestBody } from '../types/RequestTypes'

type SearchClientResponseBody = {
    state: null | 0 | 1 | 2 | 3 | 4,
    client_id: string | null
}

const searchClientUrl = api.buildLoadUrl('searchclient')
const addClientUrl = api.buildLoadUrl('addclient')

//Функция создания тела запроса addclient
function buildAddClientBody(phone: string, clientId: number | null): AddClientRequestBody {
    return {
        client_id: clientId,
        phone: phone,
        first_name: 'Test',
        middle_name: 'v1',
        last_name: 'Autotest',
        birth_date: '26.03.1999',
        sex: 1,
        email: `autotest${Date.now()}@test.ru`,
        shift_open_dt: api.getLocalDateTime(),
        not_to_send_email: 1,
        not_to_send_sms: 1
    }
}

//Функция поиска свободного client_id
async function searchClientId(
    request: APIRequestContext,
    phone: string
): Promise<number | null> {
    const body: SearchClientRequestBody = {
        search_mode: 0,
        search_value: phone
    }

    const response = await request.post(searchClientUrl, {
        data: body
    })

    expect(response.status()).toBe(200)

    const responseBody =
        await response.json() as SearchClientResponseBody

    api.logApiRequest(searchClientUrl, body)
    api.logApiResponse(response, responseBody)

    if (responseBody.client_id === null) {
        return null
    }

    const clientId = Number(responseBody.client_id)

    if (!Number.isSafeInteger(clientId)) {
        throw new Error(
            `Некорректный client_id: ${responseBody.client_id}`
        )
    }

    return clientId
}

//Функция поиска свободного номера телефона
async function findUnusedPhone(
    request: APIRequestContext
): Promise<string> {
    const maxAttempts = 20

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const phone = api.generateClientPhone()
        const clientId = await searchClientId(request, phone)

        if (clientId === null) {
            return phone
        }
    }

    throw new Error(
        `Не удалось подобрать свободный телефон за ${maxAttempts} попыток`
    )
}

test('Валидный addclient - добавление клиента', async ({ request }) => {
    const phone = await findUnusedPhone(request)

    const addClientBody = buildAddClientBody(phone, null)

    const addClientResponse = await request.post(addClientUrl, {
        data: addClientBody
    })

    expect(addClientResponse.status()).toBe(200)

    const addClientResponseBody = await addClientResponse.json()

    api.logApiRequest(addClientUrl, addClientBody)
    api.logApiResponse(addClientResponse, addClientResponseBody)

    const createdClientId = await searchClientId(request, phone)

    expect(createdClientId).not.toBeNull()
})

//Функция создания тестового клиента 
async function createTestClient(
    request: APIRequestContext
): Promise<{ phone: string; clientId: number }> {
    const phone = await findUnusedPhone(request)
    const body = buildAddClientBody(phone, null)

    const response = await request.post(addClientUrl, {
        data: body
    })

    expect(response.status()).toBe(200)

    const clientId = await searchClientId(request, phone)

    if (clientId === null) {
        throw new Error(
            `Созданный клиент с телефоном ${phone} не найден`
        )
    }

    return {
        phone,
        clientId
    }
}

test('Валидный addclient - обновление клиента', async ({ request }) => {
    const { phone, clientId } = await createTestClient(request)

    const updateBody = {
        ...buildAddClientBody(phone, clientId),
        middle_name: 'v2',
        email: `updated${Date.now()}@test.ru`
    }

    const addClientResponse = await request.post(addClientUrl, {
        data: updateBody
    })

    expect(addClientResponse.status()).toBe(200)

    const addClientResponseBody = await addClientResponse.json()

    api.logApiRequest(addClientUrl, updateBody)
    api.logApiResponse(addClientResponse, addClientResponseBody)
})