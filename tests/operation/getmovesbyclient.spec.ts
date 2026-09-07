import { test, expect } from '@playwright/test'
import * as helper from '../../helpers/clientsHelper'
import * as helperOperation from '../../helpers/operationHelper'

test('Валидный getmovesbyclient', async ({ request }) => {

    const { clientId } = await helper.createTestClient(request)

    const processSale = await helperOperation.processSale(request, clientId)

    expect(processSale.response.status()).toBe(200)

    const confirmSale = await helperOperation.confirmsale(request, processSale.body.move_id, processSale.body.doc_open_dt)

    expect(confirmSale.response.status()).toBe(200)

    const getmovesbyclient = await helperOperation.getmovesbyclient(request, clientId)

    expect(getmovesbyclient.response.status()).toBe(200)
    expect(Array.isArray(getmovesbyclient.responseBody.client_moves)).toBe(true)
    expect(getmovesbyclient.responseBody.client_moves.lenght).toBeGreaterThan(0)
})