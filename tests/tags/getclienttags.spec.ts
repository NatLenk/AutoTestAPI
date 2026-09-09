import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as tagsHelper from '../../helpers/tagsHelper'

test('Валидный тест Получить список тегов клиента', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)
    const getListTags = await tagsHelper.getListTags(request, null)
    expect(getListTags.response.status()).toBe(200)

    const tagId = getListTags.responseBody.tags_list[0].tag_id
    const addClientTags = await tagsHelper.addClientTags(request, clientId, [tagId])
    expect(addClientTags.response.status()).toBe(200)

    const getClientTags = await tagsHelper.getClientTags(request, clientId)
    expect(getClientTags.response.status()).toBe(200)
    expect(getClientTags.responseBody.data).toContain(tagId)

})