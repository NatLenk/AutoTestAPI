//Типизирование запроса searchclient
export type GoodsData = {
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

export type SearchClientResponseBody = {
    state: null | 0 | 1 | 2 | 3 | 4
    client_id: string | null
    card_id: string | null
    card_state: 0 | 2 | 3 | null
    card_code: string | null
    card_barcode: string | null
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
export type BalanceItem = {
    balance: string,
    begin_dt: string | null,
    expire_dt: string | null
}

export type GetClientFullBalanceRequestBody = {
    client_id: number
}

//Типизирование тела запроса getclientcards
export type GetClientCards = {
    client_id: number,
    outer_systems_interface_type?: null | 4 | 5 | 10
}

//Типизирование тела запроса replacecard
export type ReplaceCard = {
    search_mode: 0 | 1,
    search_value: string,
    client_id: number
}

//Типизирование тела запроса blockcard
export type BlockCard = {
    card_id: number
}

//Типизирование тела ответа blockcard
export type BlockCardResponseBody = {
    result_code: string | number
    result_text: string
}

//Типизирование тела запроса getconfirmationcode
export type GetConfirmationCode = {
    client_id: number
    outer_systems_interface_type: 5
}

//Типизирование тела запроса getlisttags
export type GetListTags = {
    group_id?: number | null
}

//Типизирование тела запроса getclienttagsinfo
export type GetClientTags = {
    client_id: number,
    tag_id?: number | null
}

//Типизирование тела запроса addclienttags
export type AddClientTags = {
    client_id: number,
    tags: number[]
}

//Типизирование тела запроса updateclienttag
export type UpdateClientTag = {
    client_id: number,
    tag: {
        id: number,
        value: number,
        action: string
    }
}

//Типизирование тела запроса deleteclienttags
export type DeleteClientTags = {
    client_id: number,
    tags: number[]
}

//Типизирование тела запроса processsale
export type ProcessSale = {
    client_id: number | null,
    type: 0 | 1,
    bonus_out: number,
    max_bonus_out: number,
    goods_data: GoodsData[],
    move_id: string,
    doc_open_dt: string,
    return_move_id?: string,
    return_doc_dt?: string,
    is_offline?: boolean,
    promo_codes?: {
        coupons:
        {
            coupon: string
        }[]

    },
    card_apply_dt?: string,
    shift_number?: number,
    client_search_mode?: 0 | 1 | 2 | 3,
    client_search_value?: string,
    is_reserved?: boolean,
    pos_discounts_are_used?: 0 | 1
}

//Типизирование тела запроса confirmsale
type Payments = {
    payment_amount: number,
    type: 0 | 1 | 2 | 3 | 99,
    gift_card_barcode?: string
}

export type ConfirmSale = {
    move_id: string,
    doc_open_dt: string,
    doc_dt: string,
    shift_open_dt?: string,
    is_offline?: 0 | 1,
    username?: string,
    useruid?: string,
    payments?: Payments[],
    goods_data?: {
        code: string,
        quantity: number,
        discounted_total: number
    }[]
}

//Типизирование запроса manualadd
export type ManualAdd = {
    client_id: number,
    bonus_in?: number,
    bonus_out?: number,
    total?: number,
    description?: string,
    expire_date?: string
}

export type ManualAddResponseBody = {
    result_code: number
    result_text: string
}

//Типизирование тела запроса getmovesbyclient
export type GetMovesByClient = {
    client_id: number
}

//Типизирование тела запроса getdetailingbymove
export type GetDetailingByMove =
    | { id: number; move_id?: string; move_date?: string }
    | { id?: number; move_id: string; move_date?: string }

//Типизирование тела запроса askconfirmphone
export type AskConfirmPhone = {
    client_id: number | null,
    phone: string,
    sms_type?: 0 | 1,
    send_type?: 0 | 1
}

//Типизирование тела запроса checkconfirmphonecode
export type CheckConfirmPhoneCode = {
    client_id: number | null,
    phone: string,
    code?: string
}

//Типизирование тела запроса searchpromocode
export type SearchPromoCode = {
    promo_code: string
}

//Типизирование тела запроса reservedpromocode
export type ReservedPromoCode = {
    promo_code: string,
    set_reserved: boolean
}

//Типизирование тела запроса generate_promocode
export type Generate_PromoCode = {
    list_id: number
}

//Типизирование тела запроса getactionslist
export type GetActionsList = {
    trade_object_id: number | null,
    goods: string[]
}

//Типизирование тела запроса getprograms
export type GetPrograms = {

}

//Типизирование тела запроса goods
export type Goods = {
    is_group?: boolean,
    delete_mark?: boolean,
    code: string,
    BC?: string[],
    name: string,
    full_name?: string
}[]

//Типизирование тела запроса goodslist
type Inside = {
    code: string,
    variant?: string,
    K?: number
}

export type GoodsList = {
    id: number,
    inside: Inside[]
}[]

//Типизирование тела запроса searchgiftcard
export type SearchGiftCard = {
    barcode: string
}

//Типизирование тела запроса generategiftcard
export type GenerateGiftCard = {
    program_id: number
}

//Типизирование тела запроса getwalletlink
export type GetWalletLink = {
    client_id: number
}

//Типизирование тела запроса getsalesindicesslides
export type GetSalesIndicesSlides = {
    date?: string
}

//Типизирование тела запроса closesession
type PaymentsSession = {
    payment_amount?: number,
    type?: 0 | 1 | 2 | 3 | 99
}

export type CloseSession = {
    payments: PaymentsSession[],
    shift_close_dt: string,
    shift_number: number
}

//Типизирование тела запроса exchangepossettings
export type ExchangePosSettings = {
    pos_program: string,
    version: string,
    autoupdate: 0 | 1
}

//Типизирование тела запроса generatecard
export type GenerateCard = {
    client_id: number,
    outer_systems_interface_type: 4
}