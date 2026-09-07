import { test, expect } from '@playwright/test'
import * as helper from '../../helpers/clientsHelper'
import * as helperOperation from '../../helpers/operationHelper'

test('Валидный getdetailingbymove', async ({ request }) => {
    const { clientId } = await helper.createTestClient(request)

    const processSale = await helperOperation.processSale(request, clientId)

    expect(processSale.response.status()).toBe(200)

    const confirmSale = await helperOperation.confirmsale(request, processSale.body.move_id, processSale.body.doc_open_dt)

    expect(confirmSale.response.status()).toBe(200)

    const getDetailingByMove = await helperOperation.getdetailingbymove(request, {
        move_id: processSale.body.move_id, move_date: confirmSale.body.doc_dt
    })

    expect(getDetailingByMove.response.status()).toBe(200)
})