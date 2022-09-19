export interface Production {
    "SERIAL_NO": string,
    "PROD_ID": number,
    "NAME": string,
    "RESOURCE": string,
    "ITEM": number,
    "DELIVERY_DATE": string,
    "STATE": string,
    "_docs": Doc[]
}
export interface ProductionData {
    production: Production,
    keys: string[]
}

export interface Doc {
    _file: File,
    type: string,
    name: string,
    category: string,
    lastModifiedDate: string,
    "date added": Date,
    _id: string
}

export interface DocDTO {
    doc: Doc
}

export interface DocsList {
    docs: Doc[]
}

export interface DocsProduction {
    docs: Doc[],
    production: Production
}


