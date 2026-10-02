import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as otherHelper from '../../helpers/otherHelper'

test('Валидный generatecard - генерация карты CardsMobile клиента', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)

    const generateCard = await otherHelper.generateCard(request, clientId)
    expect(generateCard.response.status()).toBe(200)

})
