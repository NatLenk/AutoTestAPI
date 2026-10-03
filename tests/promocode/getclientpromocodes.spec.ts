import { expect, test } from "@playwright/test";
import * as promocodeHelper from "../../helpers/promocodeHelper"
import * as clientsHelper from '../../helpers/clientsHelper'

test('getclientpromocodes - получаем промокоды клиента', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)

    const generate_Promocode = await promocodeHelper.generate_Promocode(request, clientId)
    expect(generate_Promocode.response.status()).toBe(200)

    const getClientPromocodes = await promocodeHelper.getClientPromocodes(request, clientId)
    expect(getClientPromocodes.response.status()).toBe(200)

})