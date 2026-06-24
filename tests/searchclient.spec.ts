import { test, expect, APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type { SearchClientRequestBody } from '../types/RequestTypes'

//Тест searchclient валидный

//const url = api.buildLoadUrl('searchclient')

test('Валидный searchclient', async ({ request }) => {
    const body: SearchClientRequestBody = api.buildSearchClientBody()
    const responce = await request.post(api.buildLoadUrl('searchclient'), {
        data: body
    })
    const responseBody = await responce.json()
    console.log('REQUEST_URL', api.buildLoadUrl('searchclient'))
    console.log('REQUEST_BODY', JSON.stringify(body, null, 2))
    console.log('RESPONSE_BODY', JSON.stringify(responseBody, null, 2))
})

test('Невалидный searchclient', async ({ request }) => {
    const invalidBody = api.buildSearchClientBody() as any
    invalidBody.search_mode = 999
    const responce = await request.post(api.buildLoadUrl('searchclient'), {
        data: invalidBody
    })
    const responseBody = await responce.json()
    console.log('REQUEST_URL', api.buildLoadUrl('searchclient'))
    console.log('REQUEST_BODY', JSON.stringify(invalidBody, null, 2))
    console.log('RESPONSE_BODY', JSON.stringify(responseBody, null, 2))
})