import { test, expect, APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type { SearchClientRequestBody } from '../types/RequestTypes'

//Тест searchclient валидный

//const url = api.buildLoadUrl('searchclient')

test('SearchClient', async ({ request }) => {
    const body: SearchClientRequestBody = api.buildSearchClientBody()
    const requestsearch = await request.post(api.buildLoadUrl('searchclient'), {
        data: body
    })
    const responseBody = await requestsearch.json()
    console.log('REQUEST_URL', api.buildLoadUrl('searchclient'))
    console.log('REQUEST_BODY', JSON.stringify(body, null, 2))
    console.log('RESPONSE_BODY', JSON.stringify(responseBody, null, 2))
})