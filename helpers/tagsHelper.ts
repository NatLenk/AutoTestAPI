import type { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

// Собираем тело запроса getlisttags
export function buildGetListTagsBody(groupId: number | null): Types.GetListTags {

    return {
        group_id: groupId
    }

}

// Отправляем запрос getlisttags
export async function getListTags(request: APIRequestContext, groupId: number | null) {

    const body = buildGetListTagsBody(groupId)

    return api.sendApiRequest<Types.GetListTags, Types.GetListTagsResponseBody>(request, {
        endpoint: 'getlisttags',
        method: 'POST',
        payload: body
    })

}

// Собираем тело запроса getclienttagsinfo
export function buildGetClientTagsInfoBody(clientId: number, tagId?: number | null): Types.GetClientTags {

    return {
        client_id: clientId,
        tag_id: tagId
    }

}

// Отправляем запрос getclienttagsinfo
export async function getClientTagsInfo(request: APIRequestContext, clientId: number, tagId?: number | null) {

    const body = buildGetClientTagsInfoBody(clientId, tagId)

    return api.sendApiRequest<Types.GetClientTags, Types.GetClientTagsInfoResponseBody>(request, {
        endpoint: 'getclienttagsinfo',
        method: 'POST',
        payload: body
    })

}

// Собираем тело запроса addclienttags
export function buildAddClientTagsBody(clientId: number, tags: number[]): Types.AddClientTags {

    return {
        client_id: clientId,
        tags
    }

}

// Отправляем запрос addclienttags
export async function addClientTags(request: APIRequestContext, clientId: number, tags: number[]) {

    const body = buildAddClientTagsBody(clientId, tags)

    return api.sendApiRequest(request, {
        endpoint: 'addclienttags',
        method: 'POST',
        payload: body
    })

}

// Собираем тело запроса updateclienttag
export function buildUpdateClientTagBody(clientId: number, tag: { id: number, value: number, action: string }): Types.UpdateClientTag {

    return {
        client_id: clientId,
        tag: tag
    }

}

// Отправляем запрос updateclienttag
export async function updateClientTag(request: APIRequestContext, clientId: number, tag: { id: number, value: number, action: string }) {

    const body = buildUpdateClientTagBody(clientId, tag)

    return api.sendApiRequest(request, {
        endpoint: 'updateclienttag',
        method: 'POST',
        payload: body
    })

}

// Собираем тело запроса deleteclienttags
export function buildDeleteClientTagsBody(clientId: number, tags: number[]): Types.DeleteClientTags {

    return {
        client_id: clientId,
        tags
    }

}

// Отправляем запрос deleteclienttags
export async function deleteClientTags(request: APIRequestContext, clientId: number, tags: number[]) {

    const body = buildDeleteClientTagsBody(clientId, tags)

    return api.sendApiRequest(request, {
        endpoint: 'deleteclienttags',
        method: 'POST',
        payload: body
    })

}
