import { z } from 'zod'

export const getListTagsResponseSchema = z.object({
    result_code: z.number(),
    groupId: z.number().optional(),
    groups_list: z.array(z.object({
        group_name: z.string().optional(),
        group_id: z.number().optional()
    })).optional(),
    tags_list: z.array(z.object({
        tag_id: z.number().optional(),
        tag_name: z.string().optional(),
        group_id: z.number().optional()
    })).optional()
})

export const getClientTagsInfoResponseSchema = z.object({
    result_code: z.string(),
    data: z.array(z.object({
        tag_id: z.number(),
        tag_type: z.string(),
        avalue: z.number().optional()
    }))
})

export const addClientTagsResponseSchema = z.object({
    result_code: z.string(),
    result_text: z.string()
})

export const updateClientTagResponseSchema = z.object({
    result_code: z.string(),
    result_text: z.string(),
    tag_id: z.number().optional(),
    sum: z.number().optional()
})

export const deleteClientTagsResponseSchema = z.object({
    result_code: z.string(),
    result_text: z.string()
})