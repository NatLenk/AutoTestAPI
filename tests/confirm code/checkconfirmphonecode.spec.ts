import { test, expect } from '@playwright/test'
import * as confirmCodeHelper from '../../helpers/confirmCodeHelper'
import * as clientsHelper from '../../helpers/clientsHelper'

test('Невалидный checkconfirmphonecode - без отправки кода', async ({ request }) => {

    const { clientId, phone } = await clientsHelper.createTestClient(request)

    const askConfirmPhone = await confirmCodeHelper.askConfirmPhone(request, clientId, phone)

    expect(askConfirmPhone.response.status()).toBe(200)

    const checkConfirmPhoneCode = await confirmCodeHelper.checkConfirmPhoneCode(request, clientId, phone)

    expect(checkConfirmPhoneCode.response.status()).toBe(200)
})