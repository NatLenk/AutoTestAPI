import type { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

// Собираем тело запроса searchgiftcard
export function buildSearchGiftCardBody(barcode: string): Types.SearchGiftCard {

    return {
        barcode
    }

}

// Отправляем запрос searchgiftcard
export async function searchGiftCard(request: APIRequestContext, barcode: string) {

    const body = buildSearchGiftCardBody(barcode)

    return api.sendApiRequest(request, {
        endpoint: 'searchgiftcard',
        method: 'POST',
        payload: body
    })

}

// Отправляем запрос getprogramgiftcard (GET без тела)
export async function getProgramGiftCard(request: APIRequestContext) {

    return api.sendApiRequest<undefined, Types.GetProgramGiftCardResponseBody>(request, {
        endpoint: 'getprogramgiftcard',
        method: 'GET',
        payload: undefined
    })

}

// Берём ID первой программы, в которой можно создавать сертификаты
export async function getGiftCardProgramId(request: APIRequestContext): Promise<number> {

    const getProgramGiftCardResult = await getProgramGiftCard(request)

    if (getProgramGiftCardResult.response.status() !== 200) {
        throw new Error(`Не получили список программ сертификатов: getprogramgiftcard вернул статус ${getProgramGiftCardResult.response.status()}.`)
    }

    const programs = getProgramGiftCardResult.responseBody?.data

    if (!Array.isArray(programs)) {
        throw new Error('В ответе getprogramgiftcard поле data должно быть массивом программ.')
    }

    const program = programs.find(program => program.generate_gift_card === true)

    if (!program) {
        throw new Error('Не нашли программу с generate_gift_card = true. Нужно создать программу сертификатов в личном кабинете и включить генерацию. Как это сделать, написано в README.md.')
    }

    return program.id

}

// Собираем тело запроса generategiftcard
export function buildGenerateGiftCardBody(programId: number): Types.GenerateGiftCard {

    return {
        program_id: programId
    }

}

// Отправляем запрос generategiftcard
export async function generateGiftCard(request: APIRequestContext) {

    const programId = await getGiftCardProgramId(request)
    const body = buildGenerateGiftCardBody(programId)

    return api.sendApiRequest<Types.GenerateGiftCard, Types.GenerateGiftCardResponseBody>(request, {
        endpoint: 'generategiftcard',
        method: 'POST',
        payload: body
    })

}
