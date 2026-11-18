import { test, expect } from '@playwright/test'
import * as otherHelper from '../../helpers/otherHelper'
import { exchangePosSettingsSchema } from '../../schemas/otherSchema'

test('exchangepossettings - отправляем данные кассовой программы', async ({ request }) => {

    const exchangePosSettings = await otherHelper.exchangePosSettings(request, 'AutoTestAPI', '1.0.0')
    expect(exchangePosSettings.response.status()).toBe(200)
    exchangePosSettingsSchema.parse(exchangePosSettings.responseBody)

})
