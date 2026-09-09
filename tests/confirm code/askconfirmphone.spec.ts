import { test, expect } from '@playwright/test'
import * as confirmCodeHelper from '../../helpers/confirmCodeHelper'
import * as clientsHelper from '../../helpers/clientsHelper'

test('Валидный askconfirmphone', async ({ request }) => {

    const { clientId, phone } = await clientsHelper.createTestClient(request)

    const askConfirmPhone = await confirmCodeHelper.askConfirmPhone(request, clientId, phone)

    expect(askConfirmPhone.response.status()).toBe(200)
})