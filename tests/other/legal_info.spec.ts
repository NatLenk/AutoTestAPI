import { test, expect } from '@playwright/test'
import * as otherHelper from '../../helpers/otherHelper'
import { legal_infoSchema } from '../../schemas/otherSchema'

test('legal_info - получаем ссылки на правовую информацию', async ({ request }) => {

    const legalInfo = await otherHelper.legalInfo(request)
    expect(legalInfo.response.status()).toBe(200)
    legal_infoSchema.parse(legalInfo.responseBody)

})
