import { APIResponse } from '@playwright/test';


const baseUrl = process.env.BASE_URL!
const token = process.env.API_TOKEN!

//Функция создания url с проверкой и удалением лишних слешей перед endpoint
export function buildLoadUrl(endpoint: string): string {
    const normalizedEndpoint = endpoint.replace(/^\/+/, '');

    const url = new URL(`${normalizedEndpoint}`, baseUrl);

    url.searchParams.set('h', token);

    return url.toString();
}

//Функция логирования запроса
export function logApiRequest(
    url: string,
    body: unknown
) {
    const safeUrl = new URL(url)
    safeUrl.searchParams.set('h', '***')

    console.log('REQUEST_URL', safeUrl.toString())
    console.log('REQUEST_BODY', JSON.stringify(body, null, 2))
}

//Функция логирования ответа
export function logApiResponse(
    response: APIResponse,
    responseBody: unknown
) {
    console.log('STATUS', response.status())
    console.log('RESPONSE_BODY', JSON.stringify(responseBody, null, 2))
}