import { test, expect } from '@playwright/test'
import * as clientsHelper from '../../helpers/clientsHelper'
import * as operationHelper from '../../helpers/operationHelper'

test('getclientfullbalance - проверяем баланс нового клиента', async ({ request }) => {

    const { clientId } = await clientsHelper.createTestClient(request)

    const getClientFullBalance = await clientsHelper.getClientFullBalance(request, clientId)
    expect(getClientFullBalance.response.status()).toBe(200)
    expect(Array.isArray(getClientFullBalance.responseBody)).toBe(true)

    const totalBalance = clientsHelper.calculateTotalBalance(getClientFullBalance.responseBody)
    expect(Number.isFinite(totalBalance)).toBe(true)

})

test('getclientfullbalance - проверяем баланс после добавления бонусов', async ({ request }) => {

    const bonusAmount = 10

    const { clientId } = await clientsHelper.createTestClient(request)

    const balanceBefore = await clientsHelper.getClientFullBalance(request, clientId)
    expect(balanceBefore.response.status()).toBe(200)
    expect(Array.isArray(balanceBefore.responseBody)).toBe(true)

    const totalBalanceBefore = clientsHelper.calculateTotalBalance(balanceBefore.responseBody)
    expect(Number.isFinite(totalBalanceBefore)).toBe(true)

    const manualAdd = await operationHelper.manualAdd(request, clientId, { bonus_in: bonusAmount, description: 'Добавляем бонусы и проверяем баланс клиента' })
    expect(manualAdd.response.status()).toBe(200)
    expect(manualAdd.responseBody.result_code).toBe(0)


    const balanceAfter = await clientsHelper.getClientFullBalance(request, clientId)
    expect(balanceAfter.response.status()).toBe(200)
    expect(Array.isArray(balanceAfter.responseBody)).toBe(true)

    const totalBalanceAfter = clientsHelper.calculateTotalBalance(balanceAfter.responseBody)
    expect(Number.isFinite(totalBalanceAfter)).toBe(true)

    expect(totalBalanceAfter - totalBalanceBefore).toBeCloseTo(bonusAmount, 2)

})