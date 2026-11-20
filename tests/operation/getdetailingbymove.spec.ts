import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as operationHelper from '../../helpers/operationHelper'
import { getDetailingByMoveResponseSchema } from '../../schemas/operationSchema'

test('getdetailingbymove - получаем подробности операции', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)
    const processSale = await operationHelper.processSale(request, clientId)
    expect(processSale.response.status()).toBe(200)
    await new Promise(resolve => setTimeout(resolve, 10_000))

    const getDetailingByMove = await operationHelper.getdetailingbymove(request, {
        move_id: processSale.body.move_id, move_date: processSale.body.doc_open_dt
    })
    expect(getDetailingByMove.response.status()).toBe(200)
    getDetailingByMoveResponseSchema.parse(getDetailingByMove.responseBody)

})