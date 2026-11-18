import { z } from 'zod'

export const closeSessionSchema = z.object({

    result_code: z.string(),
    result_text: z.string()

})

export const exchangePosSettingsSchema = z.object({

    result_code: z.string(),
    registration_fields: z.object({
        last_name: z.number().optional(),
        first_name: z.number().optional(),
        middle_name: z.number().optional(),
        sex: z.number().optional(),
        birth_date: z.number().optional(),
        email: z.number().optional(),
        referal: z.number().optional(),
        description: z.number().optional(),
        sending_promo_msg: z.number().optional()
    }).optional(),
    save_nonbonus_moves: z.string().optional(),
    osmi_cards_are_used: z.string().optional()

})

export const generateCardSchema = z.object({

    result_code: z.string(),
    result_text: z.string(),
    card_code: z.string().optional()

})


export const legal_infoSchema = z.object({

    personal_data_policy_url: z.string(),
    program_rules_url: z.string(),
    agreement_url: z.string()

})