import { z } from 'zod'

export const referralSchema = z.object({

    referrals: z.array(z.object({
        client_id: z.number(),
        last_name: z.string(),
        first_name: z.string(),
        register_date: z.string()
    })).optional(),
    referral_bonuses: z.number().optional(),
    error_code: z.number()

})