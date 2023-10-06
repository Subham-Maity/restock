export interface Column {
    id:
        | "token"
        | "price"
        | "lastUpdated"
        | "tradingDate"
        | "buys"
        | "sells"
        | "txns"
        | "volume"
        | "liquidity"
        | "fdv"
        | "age"
        | "fiveM"
        | "oneH"
        | "twentyH";

    label: string;
    minWidth?: string;
    align?: "left" | "right";
    sorting?: boolean;
}

export interface DataRow {
    token?: string;
    price?: number;
    lastUpdated?: string;
    tradingDate?: string;
    buys?: number;
    sells?: number;
    txns?: number;
    volume?: number;
    liquidity?: number;
    fdv?: number;
    age?: string;
    fiveM?: number;
    oneH?: number;
    twentyH?: number;
}
