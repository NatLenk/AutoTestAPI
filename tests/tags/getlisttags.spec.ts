import { test, expect } from '@playwright/test'
import * as tagsHelper from '../../helpers/tagsHelper'

test('getlisttags - получаем список тегов', async ({ request }) => {

    const getListTags = await tagsHelper.getListTags(request, null)
    expect(getListTags.response.status()).toBe(200)
    expect(typeof getListTags.responseBody.result_code).toBe('number')
    expect(getListTags.responseBody.result_code).toBe(0)
    expect(Array.isArray(getListTags.responseBody.tags_list)).toBe(true)
    const tagList = getListTags.responseBody.tags_list.length
    expect(tagList).toBeGreaterThan(0)
    for (const tag of getListTags.responseBody.tags_list) {
        expect(typeof tag.tag_id).toBe('number')

        if (tag.tag_name !== undefined) {
            expect(typeof tag.tag_name).toBe('string')
        }

        if (tag.group_id !== undefined) {
            expect(typeof tag.group_id).toBe('number')
        }
    }

})