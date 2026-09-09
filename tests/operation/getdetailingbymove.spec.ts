import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as operationHelper from '../../helpers/operationHelper'

test('Валидный getdetailingbymove', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)
    const processSale = await operationHelper.processSale(request, clientId)
    expect(processSale.response.status()).toBe(200)

    const confirmSale = await operationHelper.confirmsale(request, processSale.body.move_id, processSale.body.doc_open_dt)
    expect(confirmSale.response.status()).toBe(200)

    const getDetailingByMove = await operationHelper.getdetailingbymove(request, {
        move_id: processSale.body.move_id, move_date: confirmSale.body.doc_dt
    })
    expect(getDetailingByMove.response.status()).toBe(200)

})