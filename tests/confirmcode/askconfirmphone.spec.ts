import { test, expect } from '@playwright/test'
import * as confirmcodeHelper from '../../helpers/confirmCodeHelper'
import * as clientsHelper from '../../helpers/clientsHelper'

test('askconfirmphone - запрашиваем код для подтверждения', async ({ request }) => {

    const { clientId, phone } = await clientsHelper.createTestClient(request)
    const askConfirmPhone = await confirmcodeHelper.askConfirmPhone(request, clientId, phone)
    expect(askConfirmPhone.response.status()).toBe(200)

})
