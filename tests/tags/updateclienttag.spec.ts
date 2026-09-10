import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as tagsHelper from '../../helpers/tagsHelper'

test('Валидный updateclienttag', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)
    const getListTags = await tagsHelper.getListTags(request, null)
    expect(getListTags.response.status()).toBe(200)

    const tagId = getListTags.responseBody.tags_list[0].tag_id
    const addClientTags = await tagsHelper.addClientTags(request, clientId, [tagId])
    expect(addClientTags.response.status()).toBe(200)

    const getClientTagInfo = await tagsHelper.getClientTagsInfo(request, clientId, tagId)
    expect(getClientTagInfo.response.status()).toBe(200)
    expect(getClientTagInfo.responseBody.result_code).toBe('0')

    const clientTag = getClientTagInfo.responseBody.data.find((tag: { tag_id: number }) => tag.tag_id === tagId)
    if (!clientTag) {
        throw new Error(`Тег ${tagId} не найден у клиента ${clientId}`)
    }
    expect(clientTag.tag_type, `Тег ${tagId} должен быть счётчиком`).toBe('counter')

    const updateClientTag = await tagsHelper.updateClientTag(request, clientId, { id: tagId, value: 2, action: 'up' })
    expect(updateClientTag.response.status()).toBe(200)

})