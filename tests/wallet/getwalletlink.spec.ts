import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as walletHelper from '../../helpers/walletHelper'
import { getWalletLinkSchema } from '../../schemas/walletSchema'

test('getwalletlink - получаем ссылку на Wallet-карту клиента', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)

    const getWalletLink = await walletHelper.getWalletLink(request, clientId)
    expect(getWalletLink.response.status()).toBe(200)
    getWalletLinkSchema.parse(getWalletLink.responseBody)

})
