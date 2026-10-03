import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'

test('replacecard - заменяем карту клиента', async ({ request }) => {

    const cardCode = clientsHelper.generateCardCode()
    const cardBarcode = cardCode
    const { phone, clientId } = await clientsHelper.createTestClient(request, {
        card_code: cardCode,
        card_barcode: cardBarcode
    })

    const searchMode = 1
    const searchValue = await clientsHelper.findUnusedReplacementCard(request)

    const replaceCard = await clientsHelper.replaceCard(request, searchMode, searchValue, clientId)
    expect(replaceCard.response.status()).toBe(200)
    expect(replaceCard.responseBody.result_code, replaceCard.responseBody.result_text ?? 'Ошибка замены карты').toBe('0')

    const searchClient = await clientsHelper.searchClient(request, 0, phone)
    expect(searchClient.response.status()).toBe(200)
    expect(
        searchClient.responseBody.card_code,
        replaceCard.responseBody.result_text ?? 'Карта клиента не изменилась после replacecard'
    ).toBe(searchValue)

})
