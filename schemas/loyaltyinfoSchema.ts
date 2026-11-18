import { z } from 'zod'

export const getActionsListSchema = z.object({

    result_code: z.string(),
    result_text: z.string(),
    goods: z.record(
        z.string(),
        z.array(z.strictObject({
            action: z.number().optional(),
            respond: z.number().optional()
        })).optional()
    ).optional(),
    actions: z.array(z.object({
        id: z.number().optional(),
        action: z.string().optional(),
        responds: z.array(z.object({
            id: z.number().optional(),
            value: z.number().optional(),
            do_type: z.string().optional(),
            unit_type: z.string().optional(),
            work_type: z.string().optional()
        })).optional(),
        auth_type: z.string().optional(),
        week_days: z.array(z.number()).nullable().optional(),
        action_end: z.string().nullable().optional(),
        action_begin: z.string().nullable().optional(),
        trade_objects: z.array(z.string()).nullable().optional(),
        time_limit_end: z.string().nullable().optional(),
        time_limit_begin: z.string().nullable().optional(),
        run_count_limit: z.string().nullable().optional(),
        run_count_limit_client: z.string().nullable().optional(),
        actions_programs: z.array(z.string()).nullable().optional()
    })).optional()

})

export const getProgramsSchema = z.object({

    result_code: z.string(),
    data: z.array(z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        type: z.string().optional(),
        bonus_percent: z.string().optional(),
        bonus_pay_percent: z.string().optional(),
        discount_percent: z.string().optional(),
        begin_date: z.string().nullable().optional(),
        is_default: z.string().nullable().optional()
    })).optional()

})