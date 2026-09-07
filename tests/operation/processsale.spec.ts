import { test, expect } from '@playwright/test'
import * as helper from '../../helpers/clientsHelper'
import * as helperOperation from '../../helpers/operationHelper'

test('Валидный processsale', async ({ request }) => {

    const { clientId } = await helper.createTestClient(request)

    const processSale = await helperOperation.processSale(request, clientId)

    expect(processSale.response.status()).toBe(200)
})

test('Валидный processsale - без клиента', async ({ request }) => {

    const processSale = await helperOperation.processSale(request, null)

    expect(processSale.response.status()).toBe(200)
})