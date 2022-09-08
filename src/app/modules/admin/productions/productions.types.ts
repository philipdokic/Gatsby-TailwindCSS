export interface Production {
    "SERIAL_NO": string,
    "PROD_ID": number,
    "NAME": string,
    "RESOURCE": string,
    "ITEM": number,
    "DELIVERY_DATE": string,
    "STATE": string
}

export interface ProductionsList {
    productions: Production[]
}
