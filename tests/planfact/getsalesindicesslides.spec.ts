import { test, expect } from '@playwright/test'
import * as api from '../../api.config'
import * as planfactHelper from '../../helpers/planfactHelper'

test('Валидный getsalesindicesslides - получение слайдов с текущей датой', async ({ request }) => {

    const date = api.getLocalDateTime().split(' ')[1]

    const getSalesIndicesSlides = await planfactHelper.getSalesIndicesSlides(request, date)
    expect(getSalesIndicesSlides.response.status()).toBe(200)

})

test('Валидный getsalesindicesslides - получение слайдов без даты', async ({ request }) => {

    const getSalesIndicesSlides = await planfactHelper.getSalesIndicesSlides(request)
    expect(getSalesIndicesSlides.response.status()).toBe(200)

})
