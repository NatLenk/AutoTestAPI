import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as operationHelper from '../../helpers/operationHelper'

test('Валидный manualadd', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)

    const manualAdd = await operationHelper.manualAdd(request, clientId, {
        bonus_in: 100,
        description: "Начисление бонусов автотестом"
    })

    expect(manualAdd.response.status()).toBe(200)

})