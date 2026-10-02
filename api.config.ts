import type { APIResponse, APIRequestContext } from '@playwright/test';


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

//Функция получение локальной даты компьютера
export function getLocalDateTime(date = new Date()): string {
    const pad = (value: number): string => value.toString().padStart(2, '0')

    const day = pad(date.getDate())
    const month = pad(date.getMonth() + 1)
    const year = date.getFullYear()
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())

    return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`
}

type HttpMethod =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE'
    | 'HEAD'
    | 'OPTIONS'

type RequestOptions<TPayload> = {
    endpoint: string
    method: HttpMethod
    payload: TPayload
    params?: Record<string, string | number | boolean>
    headers?: Record<string, string>
    timeout?: number
    responseType?: 'json' | 'text' | 'none'
}

type ApiResult<TPayload, TResponse> = {
    body: TPayload
    response: APIResponse
    responseBody: TResponse
}

export async function sendApiRequest<TPayload, TResponse = unknown>(request: APIRequestContext, options: RequestOptions<TPayload>): Promise<ApiResult<TPayload, TResponse>> {

    const {
        endpoint,
        method,
        payload,
        params = {},
        headers,
        timeout,
        responseType = 'json'
    } = options

    if ((method === 'GET' || method === 'HEAD') && payload !== undefined) {
        throw new Error(`${method}: передай параметры через params, без payload`)
    }
    const url = new URL(buildLoadUrl(endpoint))

    for (const [name, value] of Object.entries(params)) {
        url.searchParams.set(name, String(value))
    }

    console.log('REQUEST_METHOD', method)
    logApiRequest(url.toString(), payload)

    const response = await request.fetch(url.toString(), {
        method,
        data: payload,
        headers,
        timeout,
        failOnStatusCode: false,
        maxRetries: 0
    })

    let responseBody: unknown = null

    if (responseType !== 'none') {
        const text = await response.text()

        if (responseType === 'text') {
            responseBody = text
        } else {
            try {
                responseBody = JSON.parse(text)
            } catch (error) {
                logApiResponse(response, text)

                throw new Error(
                    `Некорректный JSON: ${method} ${endpoint}, ` +
                    `HTTP ${response.status()}`,
                    { cause: error }
                )
            }
        }
    }

    logApiResponse(response, responseBody)

    return {
        body: payload,
        response,
        responseBody: responseBody as TResponse
    }
}