import { test, expect } from '@playwright/test'
import * as helper from '../../helpers/clientsHelper'
import * as api from '../../api.config'
import * as helperOperation from '../../helpers/operationHelper'

test('Валидный confirmsale', async ({ request }) => {
    const { clientId } = await helper.createTestClient(request)

    const processSale = await helperOperation.processSale(request, clientId)

    expect(processSale.response.status()).toBe(200)

    const confirmSaleBody = helperOperation.buildConfirmsaleBody(processSale.body.move_id, processSale.body.doc_open_dt)

    api.logApiRequest(helperOperation.confirmsaleUrl, confirmSaleBody)

    const confirmSaleResponse = await request.post(helperOperation.confirmsaleUrl, {
        data: confirmSaleBody
    })

    expect(confirmSaleResponse.status()).toBe(200)

    const confirmSaleResponseBody = await confirmSaleResponse.json()

    api.logApiResponse(confirmSaleResponse, confirmSaleResponseBody)
})