import { z } from 'zod'

export const getSalesIndicesSlidesSchema = z.object({

    result_code: z.number(),
    slides: z.array(z.string()),
    info: z.string().nullable()

})