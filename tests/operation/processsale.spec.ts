import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as operationHelper from '../../helpers/operationHelper'

test('Валидный processsale', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)

    const processSale = await operationHelper.processSale(request, clientId)

    expect(processSale.response.status()).toBe(200)
})

test('Валидный processsale - без клиента', async ({ request }) => {

    const processSale = await operationHelper.processSale(request, null)

    expect(processSale.response.status()).toBe(200)
})