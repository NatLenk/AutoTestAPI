import { z } from 'zod'

export const searchPromocodeResponseSchema = z.object({
    result_code: z.string(),
    result_text: z.string(),
    promocode: z.string().optional(),
    status: z.string().optional(),
    group_id: z.number().optional(),
    group_name: z.string().optional(),
    client_id: z.number().optional(),
    create_date: z.string().optional(),
    promocode_valid_dt: z.string().nullable().optional(),
    group_description: z.string().nullable().optional()
})

export const getClientPromocodesResponseSchema = z.object({
    result_code: z.number(),
    result_text: z.string(),
    promocodes: z.array(z.object({
        promocode: z.string().optional(),
        status: z.string().optional(),
        group_id: z.number().optional(),
        group_name: z.string().optional(),
        client_id: z.number().nullable().optional(),
        create_date: z.string().optional(),
        promocode_valid_dt: z.string().nullable().optional(),
        group_description: z.string().optional()
    })).optional()
})

export const reservedPromocodeResponseSchema = z.object({
    result_code: z.string(),
    result_text: z.string().optional()
})

export const generate_promocodeResponseSchema = z.object({
    promocode: z.string().optional(),
    result_text: z.string(),
    result_code: z.string(),
    promocode_valid_dt: z.string().nullable().optional(),
    client_id: z.number().nullable().optional(),
    status: z.string().optional(),
    group_id: z.number().optional(),
    group_name: z.string().optional(),
    create_date: z.string().optional(),
    group_description: z.string().optional()
})