import { test, expect } from '@playwright/test'
import * as helper from '../../helpers/clientsHelper'
import * as helperOperation from '../../helpers/operationHelper'

test('Валидный getmovesbyclient', async ({ request }) => {

    const { clientId } = await helper.createTestClient(request)

    const processSale = await helperOperation.processSale(request, clientId)

    const confirmSale = await helperOperation.confirmsale(request, processSale.body.move_id, processSale.body.doc_open_dt)
})