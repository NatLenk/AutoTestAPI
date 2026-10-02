import { test, expect } from '@playwright/test'
import * as otherHelper from '../../helpers/otherHelper'

test('Валидный exchangepossettings - обмен настройками кассового ПО', async ({ request }) => {

    const exchangePosSettings = await otherHelper.exchangePosSettings(request, 'AutoTestAPI', '1.0.0')
    expect(exchangePosSettings.response.status()).toBe(200)

})
