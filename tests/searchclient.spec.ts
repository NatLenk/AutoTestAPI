import { test, expect, APIRequestContext } from '@playwright/test'
import * as api from '../api.config'

//Тест searchclient валидный
const body = api.buildSearchClientBody()
const url = api.buildLoadUrl('searchclient')

console.log('REQUEST_URL', url)
console.log('REQUEST_BODY', JSON.stringify(body, null, 2))

test('SearchClient', async ({ request }) => {
    const requestsearch = await request.post(url, {
        data: body
    })
    const responseBody = await requestsearch.json()

    console.log('RESPONSE_BODY', JSON.stringify(responseBody, null, 2))
})