import { test, expect } from '@playwright/test'
import * as otherHelper from '../../helpers/otherHelper'

test('closesession - отправляем данные о закрытии смены', async ({ request }) => {

    const cashPaymentAmount = 0
    const cardPaymentAmount = 0

    const closeSession = await otherHelper.closeSession(request, cashPaymentAmount, cardPaymentAmount)
    expect(closeSession.response.status()).toBe(200)

})
