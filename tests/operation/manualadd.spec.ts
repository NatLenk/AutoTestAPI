import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as operationHelper from '../../helpers/operationHelper'

test('manualadd - добавляем бонусы клиенту', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)
    const manualAdd = await operationHelper.manualAdd(request, clientId, {
        bonus_in: 100,
        description: "Добавляем бонусы в тесте"
    })
    expect(manualAdd.response.status()).toBe(200)

})