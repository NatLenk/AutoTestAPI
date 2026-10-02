import { test, expect } from '@playwright/test'
import * as otherHelper from '../../helpers/otherHelper'

test('Валидный legal_info - получение ссылок на правовую информацию', async ({ request }) => {

    const legalInfo = await otherHelper.legalInfo(request)
    expect(legalInfo.response.status()).toBe(200)

})
