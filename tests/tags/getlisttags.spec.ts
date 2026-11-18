import { test, expect } from '@playwright/test'
import * as tagsHelper from '../../helpers/tagsHelper'
import { getListTagsResponseSchema } from '../../schemas/tagsSchema'

test('getlisttags - получаем список тегов', async ({ request }) => {

    const getListTags = await tagsHelper.getListTags(request, null)
    expect(getListTags.response.status()).toBe(200)
    getListTagsResponseSchema.parse(getListTags.responseBody)
    expect(getListTags.responseBody.result_code).toBe(0)

})