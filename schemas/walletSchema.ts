import { z } from 'zod'

export const getWalletLinkSchema = z.object({

    result_code: z.string(),
    result_text: z.string(),
    wallet_link: z.string().optional()

})