import { test, expect, APIRequestContext } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as api from '../../api.config'
import * as tagsHelper from '../../helpers/tagsHelper'

test('Валидный тест Получение списка тегов', async ({ request }) => {

    const getListTagsBody = tagsHelper.buildGetListTagsBody(null)

    const getListTagsResponse = await request.post(tagsHelper.getListTagsUrl, {
        data: getListTagsBody
    })

    expect(getListTagsResponse.status()).toBe(200)

    const getListTagsResponseBody = await getListTagsResponse.json()

    api.logApiRequest(tagsHelper.getListTagsUrl, getListTagsBody)
    api.logApiResponse(getListTagsResponse, getListTagsResponseBody)
})