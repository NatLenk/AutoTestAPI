import { test, expect } from '@playwright/test'
import * as helper from '../../helpers/clientsHelper'
import * as api from '../../api.config'
import * as helperTags from '../../helpers/tagsHelper'

test('Валидный тест Получить список тегов клиента', async ({ request }) => {

    const { clientId } = await helper.createTestClient(request)

    const getListTagsBody = helperTags.buildGetListTagsBody(null)

    const getListTagsResponse = await request.post(helperTags.getListTagsUrl, {
        data: getListTagsBody
    })

    expect(getListTagsResponse.status()).toBe(200)

    const getListTagsResponseBody = await getListTagsResponse.json()

    const tagId = getListTagsResponseBody.tags_list[0].tag_id

    const addClientTagsBody = helperTags.buildAddClientTagsBody(clientId, [tagId])

    const addClientTagsResponse = await request.post(helperTags.addClientTagsUrl, {
        data: addClientTagsBody
    })

    expect(addClientTagsResponse.status()).toBe(200)

    const getClientTagsBody = helperTags.buildGetClientTagsBody(clientId)

    const getClientTagsResponse = await request.post(helperTags.getClientTagsUrl, {
        data: getClientTagsBody
    })

    expect(getClientTagsResponse.status()).toBe(200)

    const getClientTagsResponseBody = await getClientTagsResponse.json()

    expect(getClientTagsResponseBody.data).toContain(tagId)

    api.logApiRequest(helperTags.getClientTagsUrl, getClientTagsBody)
    api.logApiResponse(getClientTagsResponse, getClientTagsResponseBody)
})