import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as walletHelper from '../../helpers/walletHelper'

test('Валидный getwalletlink - получение ссылки на карту wallet клиента', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)

    const getWalletLink = await walletHelper.getWalletLink(request, clientId)
    expect(getWalletLink.response.status()).toBe(200)

})
