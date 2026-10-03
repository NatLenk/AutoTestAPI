import type { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

// Собираем тело запроса getsalesindicesslides
export function buildGetSalesIndicesSlidesBody(date?: string): Types.GetSalesIndicesSlides {

    return {
        ...(date === undefined ? {} : { date })
    }

}

// Отправляем запрос getsalesindicesslides
export async function getSalesIndicesSlides(request: APIRequestContext, date?: string) {

    const body = buildGetSalesIndicesSlidesBody(date)

    return api.sendApiRequest<Types.GetSalesIndicesSlides, string>(request, {
        endpoint: 'getsalesindicesslides',
        method: 'POST',
        payload: body,
        responseType: 'text'
    })

}
