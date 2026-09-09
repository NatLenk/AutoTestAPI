import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'

test('Проверка баланса нового клиента', async ({ request }) => {
    const { clientId } = await clientsHelper.createTestClient(request)
    const totalBalance = await clientsHelper.getClientBalance(request, clientId)

    expect(Number.isFinite(totalBalance)).toBe(true)
})

test('Проверка изменения баланса после ручного начисления', async ({ request }) => {
    const bonusAmount = 10

    const { clientId } = await clientsHelper.createTestClient(request)

    const balanceBefore = await clientsHelper.getClientBalance(request, clientId)

    await clientsHelper.addManualBonus(
        request,
        clientId,
        bonusAmount
    )

    const balanceAfter = await clientsHelper.getClientBalance(request, clientId)

    expect(balanceAfter - balanceBefore).toBeCloseTo(bonusAmount, 2)
})