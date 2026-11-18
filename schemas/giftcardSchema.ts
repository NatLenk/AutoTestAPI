import { z } from 'zod'

export const generateGiftCardSchema = z.object({

    result_code: z.string(),
    result_text: z.string(),
    gc_code: z.string(),
    gc_barcode: z.string(),
    gc_state: z.number(),
    gc_state_text: z.string(),
    gc_balance: z.number()

})

export const searchGiftCardSchema = z.object({

    result_code: z.string(),
    result_text: z.string(),
    gc_code: z.string(),
    gc_barcode: z.string(),
    gc_state: z.number(),
    gc_state_text: z.string(),
    gc_write_off_type: z.number(),
    gc_balance: z.number()

})

export const getProgramGiftCardSchema = z.object({

    result_code: z.string(),
    data: z.array(z.object({
        id: z.number(),
        aname: z.string(),
        description: z.string(),
        generate_gift_card: z.boolean()
    }))

})