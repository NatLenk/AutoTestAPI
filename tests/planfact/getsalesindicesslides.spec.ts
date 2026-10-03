import { test, expect } from '@playwright/test'
import * as api from '../../api.config'
import * as planfactHelper from '../../helpers/planfactHelper'

test('getsalesindicesslides - получаем слайды с сегодняшней датой', async ({ request }) => {

    const date = api.getLocalDateTime().split(' ')[1]

    const getSalesIndicesSlides = await planfactHelper.getSalesIndicesSlides(request, date)
    expect(getSalesIndicesSlides.response.status()).toBe(200)

})

test('getsalesindicesslides - получаем слайды без даты в запросе', async ({ request }) => {

    const getSalesIndicesSlides = await planfactHelper.getSalesIndicesSlides(request)
    expect(getSalesIndicesSlides.response.status()).toBe(200)

})
