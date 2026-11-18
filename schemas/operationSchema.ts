import { string, z } from 'zod'

export const processSaleResponsSchema = z.object({
    result_code: z.string(),
    result_text: z.string(),
    _bill_data: z.object({
        items: z.array(z.object({
            code: z.string(),
            flags: z.number(),
            price: z.number(),
            total: z.number(),
            bonus_in: z.number(),
            discount: z.number(),
            quantity: z.number(),
            rounding: z.number(),
            bonus_out: z.number(),
            bonus_out_money: z.number(),
            client_discount: z.number().nullable(),
            discounted_price: z.number(),
            discounted_total: z.number()
        })),
        total: z.number(),
        bonus_in: z.number(),
        discount: z.number(),
        bonus_out: z.number(),
        discounted_total: z.number()
    }),
    _bill_body: z.array(z.object({
        text: z.string().optional(),
        align: z.string().optional()
    })).nullable(),
    _bill_header: z.string().nullable(),
    _bill_footer: z.string().nullable(),
    coupons_out: z.array(z.unknown()).optional(),
    cashier_messages: z.array(z.object({
        msg_text: z.array(z.string()),
        msg_type: z.string(),
        msg_header: z.string()
    })).optional()
})

export const confirmSaleResponseScheme = z.object({
    result_code: z.string(),
    result_text: z.string()
})

export const manualAddResponseScheme = z.object({
    result_code: z.int(),
    result_text: z.string()
})

export const getMovesByClientResponseScheme = z.object({
    result_code: z.string(),
    client_moves: z.array(z.object({
        id: z.number().optional(),
        move_id: z.string().nullable().optional(),
        bonus_in: z.number().optional(),
        discount: z.number().optional(),
        bonus_out: z.number().optional(),
        move_asum: z.number().optional(),
        move_date: z.string().optional(),
        oper_type: z.number().optional(),
        rows_count: z.number().optional(),
        oper_description: z.string().optional(),
        manualadd_description: z.string().optional(),
        trade_object: z.string().nullable().optional(),
        bonus_in_date: z.string().nullable().optional(),
        bonus_term_date: z.string().nullable().optional()
    })).optional()
})

export const getDetailingByMoveResponseSchema = z.object({
    result_code: string(),
    result_text: z.string(),
    move_info: z.object({
        id: z.number().optional(),
        move_id: z.string().nullable().optional(),
        bonus_in: z.number().optional(),
        discount: z.number().optional(),
        bonus_out: z.number().optional(),
        client_id: z.number().nullable().optional(),
        move_asum: z.number().optional(),
        move_date: z.string().optional(),
        oper_type: z.number().optional(),
        move_total: z.number().optional(),
        is_reserved: z.boolean().optional(),
        promo_codes: z.array(z.string()).optional(),
        is_confirmed: z.boolean().optional(),
        move_actions: z.array(z.object({
            action_id: z.number().optional(),
            action_name: z.string().optional()
        })).nullable().optional(),
        shift_number: z.number().optional(),
        cash_discount: z.number().optional(),
        bonus_presents: z.array(z.object({
            bonus_in: z.number().optional(),
            action_id: z.number().optional(),
            action_name: z.string().optional(),
            expire_date: z.string().nullable().optional(),
            bonus_in_date: z.string().nullable().optional()
        })).nullable().optional(),
        bonus_in_detail: z.array(z.object({
            bonus_in: z.number().optional(),
            expire_date: z.string().nullable().optional(),
            bonus_in_date: z.string().nullable().optional()
        })).nullable().optional()
    }).optional(),
    move_detail: z.array(z.object({
        code: z.string().optional(),
        name: z.string().optional(),
        price: z.number().optional(),
        total: z.number().optional(),
        actions: z.array(z.object({
            action_id: z.number().optional(),
            action_name: z.string().optional()
        })).nullable().optional(),
        barcode: z.string().optional(),
        bonus_in: z.number().optional(),
        discount: z.number().optional(),
        quantity: z.number().optional(),
        bonus_out: z.number().optional(),
        cash_discount: z.number().optional(),
        discounted_price: z.number().optional(),
        discounted_total: z.number().optional()
    })).optional()
})