import type { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'
import * as helperClient from '../helpers/clientsHelper'
import { randomUUID } from 'node:crypto'

//Функция построения тела запроса processsale
export function buildProcessSaleBody(clientId: number | null, type: 0 | 1, bonusOut: number, maxBonusOut: number, overrides: Partial<Types.ProcessSale> = {}): Types.ProcessSale {

    return {
        client_id: clientId,
        type,
        bonus_out: bonusOut,
        max_bonus_out: maxBonusOut,
        goods_data: helperClient.buildGoodsData(),
        move_id: randomUUID(),
        doc_open_dt: api.getLocalDateTime(),
        ...overrides
    }

}

//Функция отправки запроса processsale
export async function processSale(request: APIRequestContext, clientId: number | null, overrides: Partial<Types.ProcessSale> = {}) {

    const body = buildProcessSaleBody(clientId, 0, 0, 0, overrides)

    return api.sendApiRequest(request, {
        endpoint: 'processsale',
        method: 'POST',
        payload: body
    })

}

//Функция построения тела запроса confirmsale
export function buildConfirmsaleBody(moveId: string, docOpenDt: string, overrides: Partial<Types.ConfirmSale> = {}): Types.ConfirmSale {

    return {
        move_id: moveId,
        doc_open_dt: docOpenDt,
        doc_dt: api.getLocalDateTime(),
        ...overrides
    }

}

//Функция отправки запроса confirmsale
export async function confirmsale(request: APIRequestContext, moveId: string, docOpenDt: string, overrides: Partial<Types.ConfirmSale> = {}) {

    const body = buildConfirmsaleBody(moveId, docOpenDt, overrides)

    return api.sendApiRequest(request, {
        endpoint: 'confirmsale',
        method: 'POST',
        payload: body
    })

}

//Функция построения тела запроса manualadd
export function buildManualAddBody(clientId: number, overrides: Partial<Types.ManualAdd> = {}): Types.ManualAdd {

    return {
        client_id: clientId,
        ...overrides
    }

}


//Функция отправки запроса manualadd
export async function manualAdd(request: APIRequestContext, clientId: number, overrides: Partial<Types.ManualAdd> = {}) {

    const body = buildManualAddBody(clientId, overrides)

    return api.sendApiRequest<Types.ManualAdd, Types.ManualAddResponseBody>(request, {
        endpoint: 'manualadd',
        method: 'POST',
        payload: body
    })

}

//Функция построения тела запроса getmovesbyclient
export function buildGetMovesByClientBody(clientId: number): Types.GetMovesByClient {

    return {
        client_id: clientId
    }

}

//Функция отправки запроса getmovesbyclient
export async function getmovesbyclient(request: APIRequestContext, clientId: number) {

    const body = buildGetMovesByClientBody(clientId)

    return api.sendApiRequest<
        Types.GetMovesByClient,
        Types.GetMovesByClientResponseBody
    >(request, {
        endpoint: 'getmovesbyclient',
        method: 'POST',
        payload: body
    })

}

//Функция построения тела запроса getdetailingbymove
export function buildGetDetailingByMoveBody(params: Types.GetDetailingByMove): Types.GetDetailingByMove {

    return {
        ...params
    }

}

//Функция отправки запроса getdetailingbymove
export async function getdetailingbymove(request: APIRequestContext, params: Types.GetDetailingByMove) {

    const body = buildGetDetailingByMoveBody(params)

    return api.sendApiRequest(request, {
        endpoint: 'getdetailingbymove',
        method: 'POST',
        payload: body
    })

}
