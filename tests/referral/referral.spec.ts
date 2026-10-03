import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as referralHelper from '../../helpers/referralHelper'

test('referral - получаем рефералов', async ({ request }) => {

    const { clientId: referrerClientId } = await clientsHelper.createTestClient(request)

    await clientsHelper.createTestClient(request, {
        referrer_client_id: referrerClientId
    })

    const referral = await referralHelper.referral(request, referrerClientId)
    expect(referral.response.status()).toBe(200)

})
