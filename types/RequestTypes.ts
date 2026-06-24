//Типизирование тела запроса searchclient
type GoodsData = {
    code: string,
    barcode?: string,
    vendor_code: string,
    name: string,
    variant?: string,
    price: number,
    quantity: number,
    total: number,
    minPrice?: number,
    maxDiscount?: number,
    discounted_price: number,
    discounted_total: number,
    parent_code?: string,
    parent_vendor_code?: string,
    good_promo?: string[],
    flags?: number,
    new_price_action_id?: number | null,
    new_price_respond_id?: number | null,
    new_price_limit_action_id?: number | null,
    new_price_limit_respond_id?: number | null,
    new_price_limits_counter_quantity?: number | null
}

export type SearchClientRequestBody = {
    search_mode: 0 | 1 | 2 | 3,
    search_value: string,
    goods_data?: GoodsData[],
    promo_codes?: {
        coupons:
        {
            coupon: string
        }[]

    },
    card_apply_dt?: string,
    full_data?: boolean,
    pos_discounts_are_used?: 0 | 1

}

//Типизирование тела запроса addclient
type SpecialDay = {
    id: number,
    value: string
}

export type AddClientRequestBody = {
    client_id: number | null,
    phone: string,
    first_name?: string,
    middle_name?: string,
    last_name?: string,
    birth_date?: string,
    sex?: 0 | 1,
    email?: string,
    shift_open_dt?: string,
    special_days?: SpecialDay[],
    promo_code?: string,
    not_to_send_sms?: 0 | 1,
    not_to_send_email?: 0 | 1,
    referrer_client_id?: number,
    outer_systems_interface_type?: 4 | 5,
    card_code?: string,
    card_barcode?: string
}

//Типизирование тела запроса getclientfullbalance
export type GetClientFullBalanceRequestBody = {
    client_id:number
}

//Типизирование тела запроса getclientcards
export type GetClientCards = {
    client_id: number,
    outer_systems_interface_type?: null|4|5|10
}