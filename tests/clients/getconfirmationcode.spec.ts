import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'

test('getconfirmationcode - получаем код подтверждения', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)

    const outerSystemsInterfaceType = 5
    const getConfirmationCode = await clientsHelper.getConfirmationCode(request, clientId, outerSystemsInterfaceType)
    expect(getConfirmationCode.response.status()).toBe(200)

})