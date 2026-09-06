import { test, expect } from '@playwright/test'
import * as helper from '../../helpers/clientsHelper'
import * as api from '../../api.config'
import * as helperOperation from '../../helpers/operationHelper'

test('Валидный processsale', async ({ request }) => {

    const { clientId } = await helper.createTestClient(request)

    const processsaleBody = helperOperation.buildProcesssaleBody(clientId, 0, 0, 0)

    const processsaleResponse = await request.post(helperOperation.processsaleUrl, {
        data: processsaleBody
    })

    const processsaleResponseBody = await processsaleResponse.json()

    api.logApiRequest(helperOperation.processsaleUrl, processsaleBody)
    api.logApiResponse(processsaleResponse, processsaleResponseBody)

    expect(processsaleResponse.status()).toBe(200)
})