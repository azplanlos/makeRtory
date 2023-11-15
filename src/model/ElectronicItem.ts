export type ElectronicItem = {
    title?: string
    partNumber?: string
    packageFormat?: string
    value?: string
    stock: number
    storage?: StorageItem
    manufactorer?: string
    price?: number
    datasheetUrl?: string
}

export type StorageItem = {
    box: number
    boxName?: string
    row: number
    col: number
}