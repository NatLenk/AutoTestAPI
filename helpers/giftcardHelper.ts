import type { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

//Функция построения тела searchgiftcard
export function buildSearchGiftCardBody(barcode: string): Types.SearchGiftCard {

    return {
        barcode
    }

}

//Функция отправки запроса searchgiftcard
export async function searchGiftCard(request: APIRequestContext, barcode: string) {

    const body = buildSearchGiftCardBody(barcode)

    return api.sendApiRequest(request, {
        endpoint: 'searchgiftcard',
        method: 'POST',
        payload: body
    })

}

//Функция отправки запроса getprogramgiftcard (GET без тела)
export async function getProgramGiftCard(request: APIRequestContext) {

    return api.sendApiRequest<undefined, Types.GetProgramGiftCardResponseBody>(request, {
        endpoint: 'getprogramgiftcard',
        method: 'GET',
        payload: undefined
    })

}

//Функция получения id первой программы с доступной генерацией сертификатов
export async function getGiftCardProgramId(request: APIRequestContext): Promise<number> {

    const getProgramGiftCardResult = await getProgramGiftCard(request)

    if (getProgramGiftCardResult.response.status() !== 200) {
        throw new Error(`Не удалось получить программы подарочных сертификатов: getprogramgiftcard вернул HTTP ${getProgramGiftCardResult.response.status()}.`)
    }

    const programs = getProgramGiftCardResult.responseBody?.data

    if (!Array.isArray(programs)) {
        throw new Error('Некорректный ответ getprogramgiftcard: отсутствует массив программ data.')
    }

    const program = programs.find(program => program.generate_gift_card === true)

    if (!program) {
        throw new Error('Не найдена программа подарочных сертификатов с generate_gift_card = true. Создайте программу вручную в ЛК и включите генерацию сертификатов. Подготовка описана в README.md.')
    }

    return program.id

}

//Функция построения тела generategiftcard
export function buildGenerateGiftCardBody(programId: number): Types.GenerateGiftCard {

    return {
        program_id: programId
    }

}

//Функция отправки запроса generategiftcard
export async function generateGiftCard(request: APIRequestContext) {

    const programId = await getGiftCardProgramId(request)
    const body = buildGenerateGiftCardBody(programId)

    return api.sendApiRequest<Types.GenerateGiftCard, Types.GenerateGiftCardResponseBody>(request, {
        endpoint: 'generategiftcard',
        method: 'POST',
        payload: body
    })

}
