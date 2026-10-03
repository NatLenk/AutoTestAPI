import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as tagsHelper from '../../helpers/tagsHelper'

test('getclienttagsinfo - получаем теги клиента', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)
    const getListTags = await tagsHelper.getListTags(request, null)
    expect(getListTags.response.status()).toBe(200)

    const tagId = getListTags.responseBody.tags_list[0].tag_id
    const addClientTags = await tagsHelper.addClientTags(request, clientId, [tagId])
    expect(addClientTags.response.status()).toBe(200)

    const getClientTagsInfo = await tagsHelper.getClientTagsInfo(request, clientId, tagId)
    expect(getClientTagsInfo.response.status()).toBe(200)
    expect(getClientTagsInfo.responseBody.data).toContainEqual(
        expect.objectContaining({ tag_id: tagId })
    )

})
