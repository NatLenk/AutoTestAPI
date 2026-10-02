import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as operationHelper from '../../helpers/operationHelper'

test('Валидный getmovesbyclient', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)
    const processSale = await operationHelper.processSale(request, clientId)
    expect(processSale.response.status()).toBe(200)

    const confirmSale = await operationHelper.confirmsale(request, processSale.body.move_id, processSale.body.doc_open_dt)
    expect(confirmSale.response.status()).toBe(200)

    const getmovesbyclient = await operationHelper.getmovesbyclient(request, clientId)
    expect(getmovesbyclient.response.status()).toBe(200)
    expect(Array.isArray(getmovesbyclient.responseBody.client_moves)).toBe(true)
    expect(getmovesbyclient.responseBody.client_moves.length).toBeGreaterThan(0)

})
