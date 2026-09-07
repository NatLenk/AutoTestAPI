import { test, expect } from '@playwright/test'
import * as helper from '../../helpers/clientsHelper'
import * as helperOperation from '../../helpers/operationHelper'

test('Валидный manualadd', async ({ request }) => {

    const { clientId } = await helper.createTestClient(request)

    const manualAdd = await helperOperation.manualAdd(request, clientId, {
        bonus_in: 100,
        description: "Начисление бонусов автотестом"
    })

    expect(manualAdd.response.status()).toBe(200)

})