import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as operationHelper from '../../helpers/operationHelper'
import { processSaleResponsSchema } from '../../schemas/operationSchema'

test('processsale - расчёт с клиентом', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)
    const processSale = await operationHelper.processSale(request, clientId)
    expect(processSale.response.status()).toBe(200)
    processSaleResponsSchema.parse(processSale.responseBody)

})

test('processsale - расчёт без клиента', async ({ request }) => {

    const processSale = await operationHelper.processSale(request, null)
    expect(processSale.response.status()).toBe(200)
    processSaleResponsSchema.parse(processSale.responseBody)

})
