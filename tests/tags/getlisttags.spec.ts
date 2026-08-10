import { test, expect, APIRequestContext } from '@playwright/test'
import * as helper from '../../helpers/clientsHelper'
import * as api from '../../api.config'
import * as helperTags from '../../helpers/tagsHelper'

test('Валидный тест Получение списка тегов', async ({ request }) => {

    const getListTagsBody = helperTags.buildGetListTagsBody(null)

    const getListTagsResponse = await request.post(helperTags.getListTagsUrl, {
        data: getListTagsBody
    })

    expect(getListTagsResponse.status()).toBe(200)

    const getListTagsResponseBody = await getListTagsResponse.json()

    api.logApiRequest(helperTags.getListTagsUrl, getListTagsBody)
    api.logApiResponse(getListTagsResponse, getListTagsResponseBody)
})