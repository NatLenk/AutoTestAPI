import { success, z } from 'zod'

export const searchClientResponseSchema = z.object({
    result_code: z.string(),
    result_text: z.string(),
    client_id: z.string().nullable(),
    state: z.string().nullable(),
    bonus_percent: z.string(),
    discount_percent: z.string(),
    bonus_balance: z.number(),
    bonus_out_percent: z.string(),
    program_name: z.string(),
    program_type: z.string(),
    max_bill_bonus_out: z.string(),
    max_bonus_out: z.string(),
    only_with_cards: z.string(),
    use_sms_code: z.string(),
    use_discount_sms: z.string(),
    sms_code_sum: z.number(),
    card_id: z.string().nullable(),
    card_state: z.string().nullable(),
    card_code: z.string().nullable(),
    card_barcode: z.string().nullable(),
    phone: z.string().nullable(),
    birth_date: z.string().nullable(),
    first_name: z.string().nullable(),
    middle_name: z.string().nullable(),
    last_name: z.string().nullable(),
    full_name: z.string(),
    sex: z.string().nullable(),
    client_email: z.string(),
    discounted_total: z.string(),
    discount: z.string(),
    activate_client_type: z.string(),
    replace_card_type: z.string(),
    referral_system_is_used: z.string(),
    purchases_sum: z.string(),
    status_name: z.string().nullable(),
    next_period_status_name: z.string().nullable(),
    next_status_name: z.string().nullable(),
    next_status_purchases_sum: z.string().nullable(),
    next_status_bonus_percent: z.string().nullable(),
    next_status_discount_percent: z.string().nullable(),
    progressive_scale_type: z.number().nullable(),
    sum_to_next_status: z.string().nullable(),
    phone_is_free: z.string().nullable(),
    outer_systems_interface_type: z.number().nullable(),
    special_days_types: z.array(z.object({
        id: z.number(),
        aname: z.string(),
        value: z.string().nullable()
    })).nullable(),
    not_to_send_sms: z.number(),
    not_to_send_email: z.number(),
    tags: z.array(z.string()).nullable(),
    top_sales: z.array(z.string()).nullable(),
    program_write_off_type: z.string().nullable(),
    allow_manual_card_spend: z.number(),
    _bill_data: z.object({
        items: z.array(z.object({
            code: z.string(),
            flags: z.number(),
            price: z.number(),
            new_price_action_id: z.number().nullable(),
            new_price_respond_id: z.number().nullable(),
            new_price_limit_action_id: z.number().nullable(),
            new_price_limit_respond_id: z.number().nullable(),
            new_price_limits_counter_quantity: z.number().nullable()
        })).nullable()
    }),
    cards: z.array(z.object({
        code: z.string(),
        barcode: z.string(),
        card_id: z.number(),
        outer_systems_interface_name: z.string(),
        outer_systems_interface_type: z.number().nullable()
    })).optional(),
    interfaces: z.array(z.object({
        interface_id: z.string().nullable(),
        interface_os: z.string().nullable(),
        interface_name: z.string(),
        interface_type: z.number()
    })).optional()
})

export const addClientResponseSchema = z.object({
    success: z.number().optional(),
    client_id: z.number(),
    result_code: z.string(),
    result_text: z.string()
})

export const getClientFullBalanceResponseSchema = z.array(z.object({
    balance: z.string().optional(),
    begin_dt: z.string().nullable().optional(),
    expire_dt: z.string().nullable().optional()
}))

export const getClientCardsResponseSchema = z.object({
    result_code: z.string(),
    cards: z.array(z.object({
        code: z.string().optional(),
        barcode: z.string().optional(),
        card_id: z.number().optional(),
        outer_systems_interface_name: z.string().optional(),
        outer_systems_interface_type: z.number().nullable().optional()
    })).optional()
})

export const replaceCardResponseSchema = z.object({
    result_code: z.string(),
    result_text: z.string().optional()
})

export const blockCardResponseSchema = z.object({
    result_code: z.string(),
    result_text: z.string()
})

export const getConfirmationCodeResponseSchema = z.object({
    confirmation_code: z.string()
})