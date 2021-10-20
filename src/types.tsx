export type TableType = {
    id: number,
    name: string,
    symbol: string,
    rank: number,
    address: Array<{
        value: string,
        balance: number,
        error?: string
    }>
}