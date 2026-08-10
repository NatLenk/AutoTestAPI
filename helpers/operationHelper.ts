import { expect, APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'
import * as helperClient from '../helpers/clientsHelper'
import { randomUUID } from 'node:crypto'

export const processsaleUrl = api.buildLoadUrl('processsale')
export const confirmsaleUrl = api.buildLoadUrl('confirmsale')
export const manualaddUrl = api.buildLoadUrl('manualadd')
export const getMovesByClientUrl = api.buildLoadUrl('getmovesbyclient')
export const getDetailingByMoveUrl = api.buildLoadUrl('getdetailingbymove')

//Функция построения тела запроса processsale
export function buildProcesssaleBody(clientId: number | null, type: 0 | 1, bonusOut: number, maxBonusOut: number): Types.ProcessSale {
    return {
        client_id: clientId,
        type,
        bonus_out: bonusOut,
        max_bonus_out: maxBonusOut,
        goods_data: helperClient.buildGoodsData(),
        move_id: randomUUID(),
        doc_open_dt: api.getLocalDateTime()
    }
}

//Функция построения тела запроса confirmsale
export function buildConfirmsaleBody(moveId: string, docOpenDt: string): Types.ConfirmSale {
    return {
        move_id: moveId,
        doc_open_dt: docOpenDt,
        doc_dt: api.getLocalDateTime()
    }
}

//Функция построения тела запроса manualadd
export function buildManualAddBody(clientId: number): Types.ManualAdd {
    return {
        client_id: clientId
    }
}

//Функция построения тела запроса getmovesbyclient
export function buildGetMovesByClientBody(clientId: number): Types.GetMovesByClient {
    return {
        client_id: clientId
    }
}

//Функция построения тела запроса getdetailingbymove
export function buildGetDetailingByMoveBody(moveId: string): Types.GetDetailingByMove {
    return {
        move_id: moveId
    }
}