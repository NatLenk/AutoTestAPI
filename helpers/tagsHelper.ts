import { expect, APIRequestContext } from '@playwright/test'
import * as api from '../api.config'
import type * as Types from '../types/RequestTypes'

export const getListTagsUrl = api.buildLoadUrl('getlisttags')
export const getClientTagsUrl = api.buildLoadUrl('getclienttags')
export const addClientTagsUrl = api.buildLoadUrl('addclienttags')
export const deleteClientTagsUrl = api.buildLoadUrl('deleteclienttags')

//Функция создания тела запроса getlisttags
export function buildGetListTagsBody(groupId: number | null): Types.GetListTags {
    return {
        group_id: groupId
    }
}

//Функция создания тела запроса getclienttags
export function buildGetClientTagsBody(clientId: number): Types.GetClientTags {
    return {
        client_id: clientId
    }
}

//Функция создания тела запроса addclienttags
export function buildAddClientTagsBody(clientId: number, tags: number[]): Types.AddClientTags {
    return {
        client_id: clientId,
        tags
    }
}

//Функция создания тела запроса deleteclienttags
export function buildDeleteClientTagsBody(clientId: number, tags: number[]): Types.DeleteClientTags {
    return {
        client_id: clientId,
        tags
    }
}