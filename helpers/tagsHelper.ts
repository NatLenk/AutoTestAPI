import { APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

export const getListTagsUrl = api.buildLoadUrl('getlisttags')

export const getClientTagsInfoUrl = api.buildLoadUrl('getclienttagsinfo')

export const addClientTagsUrl = api.buildLoadUrl('addclienttags')

export const updateClientTagUrl = api.buildLoadUrl('updateclienttag')

export const deleteClientTagsUrl = api.buildLoadUrl('deleteclienttags')

//Функция создания тела запроса getlisttags
export function buildGetListTagsBody(groupId: number | null): Types.GetListTags {

    return {
        group_id: groupId
    }

}

//Функция отправки запроса getlisttags
export async function getListTags(request: APIRequestContext, groupId: number | null) {

    const body = buildGetListTagsBody(groupId)

    api.logApiRequest(getListTagsUrl, body)
    const response = await request.post(getListTagsUrl, {
        data: body
    })

    const responseBody = await response.json()
    api.logApiResponse(response, responseBody)

    return {
        body,
        response,
        responseBody
    }

}

//Функция создания тела запроса getclienttagsinfo
export function buildGetClientTagsInfoBody(clientId: number, tagId?: number | null): Types.GetClientTags {

    return {
        client_id: clientId,
        tag_id: tagId
    }

}

//Функция отправки запроса getclienttagsinfo
export async function getClientTagsInfo(request: APIRequestContext, clientId: number, tagId?: number | null) {

    const body = buildGetClientTagsInfoBody(clientId, tagId)

    api.logApiRequest(getClientTagsInfoUrl, body)
    const response = await request.post(getClientTagsInfoUrl, {
        data: body
    })

    const responseBody = await response.json()
    api.logApiResponse(response, responseBody)

    return {
        body,
        response,
        responseBody
    }

}

//Функция создания тела запроса addclienttags
export function buildAddClientTagsBody(clientId: number, tags: number[]): Types.AddClientTags {

    return {
        client_id: clientId,
        tags
    }

}

//Функция отправки запроса addclienttags
export async function addClientTags(request: APIRequestContext, clientId: number, tags: number[]) {

    const body = buildAddClientTagsBody(clientId, tags)

    api.logApiRequest(addClientTagsUrl, body)
    const response = await request.post(addClientTagsUrl, {
        data: body
    })

    const responseBody = await response.json()
    api.logApiResponse(response, responseBody)

    return {
        body,
        response,
        responseBody
    }

}

//Функция создания тела запроса updateclienttag
export function buildUpdateClientTag(clientId: number, tag: { id: number, value: number, action: string }): Types.UpdateClientTag {

    return {
        client_id: clientId,
        tag: tag
    }

}

//Функция отправки запроса updateclienttag
export async function updateClientTag(request: APIRequestContext, clientId: number, tag: { id: number, value: number, action: string }) {

    const body = buildUpdateClientTag(clientId, tag)

    api.logApiRequest(updateClientTagUrl, body)
    const response = await request.post(updateClientTagUrl, {
        data: body
    })

    const responseBody = await response.json()
    api.logApiResponse(response, responseBody)

    return {
        body,
        response,
        responseBody
    }

}

//Функция создания тела запроса deleteclienttags
export function buildDeleteClientTagsBody(clientId: number, tags: number[]): Types.DeleteClientTags {

    return {
        client_id: clientId,
        tags
    }

}

//Функция отправки запроса deleteclienttags
export async function deleteClientTags(request: APIRequestContext, clientId: number, tags: number[]) {

    const body = buildDeleteClientTagsBody(clientId, tags)

    api.logApiRequest(deleteClientTagsUrl, body)
    const response = await request.post(deleteClientTagsUrl, {
        data: body
    })

    const responseBody = await response.json()
    api.logApiResponse(response, responseBody)

    return {
        body,
        response,
        responseBody
    }

}