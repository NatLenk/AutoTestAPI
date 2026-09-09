import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as api from '../../api.config'
import * as tagsHelper from '../../helpers/tagsHelper'

test('Валидный тест Получить список тегов клиента', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)

    const getListTagsBody = tagsHelper.buildGetListTagsBody(null)

    const getListTagsResponse = await request.post(tagsHelper.getListTagsUrl, {
        data: getListTagsBody
    })

    expect(getListTagsResponse.status()).toBe(200)

    const getListTagsResponseBody = await getListTagsResponse.json()

    const tagId = getListTagsResponseBody.tags_list[0].tag_id

    const addClientTagsBody = tagsHelper.buildAddClientTagsBody(clientId, [tagId])

    const addClientTagsResponse = await request.post(tagsHelper.addClientTagsUrl, {
        data: addClientTagsBody
    })

    expect(addClientTagsResponse.status()).toBe(200)

    const getClientTagsBody = tagsHelper.buildGetClientTagsBody(clientId)

    const getClientTagsResponse = await request.post(tagsHelper.getClientTagsUrl, {
        data: getClientTagsBody
    })

    expect(getClientTagsResponse.status()).toBe(200)

    const getClientTagsResponseBody = await getClientTagsResponse.json()

    expect(getClientTagsResponseBody.data).toContain(tagId)

    api.logApiRequest(tagsHelper.getClientTagsUrl, getClientTagsBody)
    api.logApiResponse(getClientTagsResponse, getClientTagsResponseBody)
})