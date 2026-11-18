import { z } from 'zod'

export const goodsSchema = z.object({

    success: z.number().optional(),
    result_code: z.string()

})

export const goodsListSchema = z.object({

    success: z.number().optional(),
    result_code: z.string()

})