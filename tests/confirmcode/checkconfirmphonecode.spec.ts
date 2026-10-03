import { test, expect } from '@playwright/test'
import * as confirmcodeHelper from '../../helpers/confirmCodeHelper'
import * as clientsHelper from '../../helpers/clientsHelper'

test('checkconfirmphonecode - отправляем запрос без кода подтверждения', async ({ request }) => {

    const { clientId, phone } = await clientsHelper.createTestClient(request)
    const askConfirmPhone = await confirmcodeHelper.askConfirmPhone(request, clientId, phone)
    expect(askConfirmPhone.response.status()).toBe(200)

    const checkConfirmPhoneCode = await confirmcodeHelper.checkConfirmPhoneCode(request, clientId, phone)
    expect(checkConfirmPhoneCode.response.status()).toBe(200)

})
