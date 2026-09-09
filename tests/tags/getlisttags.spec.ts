import { test, expect } from '@playwright/test'
import * as tagsHelper from '../../helpers/tagsHelper'

test('Валидный тест Получение списка тегов', async ({ request }) => {

    const getListTags = await tagsHelper.getListTags(request, null)
    expect(getListTags.response.status()).toBe(200)

})