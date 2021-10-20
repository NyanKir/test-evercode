import React, {Dispatch, SetStateAction} from "react";
import {TableType} from "./types";

export const Storage = React.createContext([{
    id: 0,
    name: 'Default',
    symbol: 'DFT',
    rank: 1,
    address : [{
        id: 1,
        value: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
    }]
}])

type ContextType = {
    children: React.ReactNode,
    value: { tableData: TableType[]; setTableData: Dispatch<SetStateAction<TableType[]>>; }
}

export function Context({children, value}: ContextType) {
    return (
        // @ts-ignore
        <Storage.Provider value={value}>
            {children}
        </Storage.Provider>
    )
}