import { test, expect } from '@playwright/test'
import * as helper from '../../helpers/clientsHelper'

test('Проверка баланса нового клиента', async ({ request }) => {
    const { clientId } = await helper.createTestClient(request)
    const totalBalance = await helper.getClientBalance(request, clientId)

    expect(Number.isFinite(totalBalance)).toBe(true)
})

test('Проверка изменения баланса после ручного начисления', async ({ request }) => {
    const bonusAmount = 10

    const { clientId } = await helper.createTestClient(request)

    const balanceBefore = await helper.getClientBalance(request, clientId)

    await helper.addManualBonus(
        request,
        clientId,
        bonusAmount
    )

    const balanceAfter = await helper.getClientBalance(request, clientId)

    expect(balanceAfter - balanceBefore).toBeCloseTo(bonusAmount, 2)
})