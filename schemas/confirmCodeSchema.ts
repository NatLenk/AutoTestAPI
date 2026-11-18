import { z } from 'zod'

export const askConfirmPhoneResponseSchema = z.object({
    success: z.number().optional(),
    result_code: z.string(),
    result_text: z.string(),
    type_confirmation_code: z.string().optional()
})

export const checkConfirmPhoneCodeResponseSchema = z.object({
    success: z.number().optional(),
    result_code: z.string()
})