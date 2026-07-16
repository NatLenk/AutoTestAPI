import { test, expect } from '@playwright/test'
import * as api from '../../api.config'
import * as helper from '../../helpers/clientsHelper'


//Тест searchclient валидный
test('Валидный searchclient', async ({ request }) => {
    let phone = helper.generateClientPhone()
    let body = helper.buildSearchClientBody(phone)
    let response = await request.post(helper.searchClientUrl, {
        data: body
    })

    expect(response.status()).toBe(200)

    let responseBody = await response.json()

    /*while (responseBody.state !== null) {
        phone = api.generateClientPhone()
        body = buildSearchClientBody(phone)

        response = await request.post(searchClientUrl, {
            data: body
        })

        responseBody = await response.json()
    }*/

    api.logApiRequest(helper.searchClientUrl, body)
    api.logApiResponse(response, responseBody)
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