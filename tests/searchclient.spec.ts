import { test, expect } from '@playwright/test'
import * as api from '../api.config'
import type { SearchClientRequestBody } from '../types/RequestTypes'

//Функция создания тела запроса searchclient
function buildSearchClientBody(phone: string): SearchClientRequestBody {

    const couponPromoCode = `01234567891`

    return {
        search_mode: 0,
        search_value: phone,
        goods_data: api.buildGoodsData(),
        promo_codes:
        {
            coupons: [
                {
                    coupon: couponPromoCode
                }
            ]
        },
        card_apply_dt: api.getLocalDateTime(),
        full_data: false,
        pos_discounts_are_used: 0
    }
}

//Тест searchclient валидный
const searchClientUrl = api.buildLoadUrl('searchclient')

test('Валидный searchclient', async ({ request }) => {
    let phone = api.generateClientPhone()
    let body = buildSearchClientBody(phone)
    let response = await request.post(searchClientUrl, {
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

    api.logApiRequest(searchClientUrl, body)
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