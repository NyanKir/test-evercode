import React, {useCallback, useContext, useState} from "react";
import {Button} from "../Button/Button";
import styles from './Table.module.scss'
import {Input} from "../Input";
import {Storage} from "../../Context";
import {TableType} from "../../types";

const TableItemAddress = React.memo(({
                                         address,
                                         id,
                                         symbol
                                     }: { address: { value: string, balance: number, error?: string | undefined }, id: number, symbol: string }) => {
    const {setTableData}: any = useContext(Storage)

    const removeItem = () => {
        setTableData((state: TableType[]) => {
            return state.map((crypto) => {
                if (crypto.id === id) {
                    crypto.address = crypto.address.filter(el => el !== address)
                }
                return crypto
            })
        })
    }

    return (
        <div className={styles.tableAddress}>
            <span className={address.error ? styles.error : ''}>{address.value}</span>
            <span className={styles.balance}>{address.balance/100000000} {symbol.toUpperCase()}</span>
            <Button onClick={removeItem} classStyles={'btn-red'}>Delete</Button>
        </div>
    )
})

const TableItem = React.memo(({item}: { item: TableType }) => {
    const [address, setAddress] = useState('')
    const {setTableData}: any = useContext(Storage)

    const submitAddress = useCallback(() => {
        if(!address.trim()){
            alert('Incorrect data')
            return
        }
        setTableData((state: TableType[]) => state.map((el) => {
                if (el.id === item.id) {
                    const include = el.address.some((el) => el.value === address)
                    if (include) {
                        alert('Exist')
                        return el
                    }
                    el.address = [...el.address, {
                        value: address.trim(),
                        balance: 0
                    }]
                }
                return el
            })
        )
        setAddress('')
    }, [address])

    const removeItem = useCallback(() => {
        setTableData((state: TableType[]) => {
            return state.filter((el) => el.id !== item.id)
        })
    }, [])

    const tableItemsAddress = item.address.map((address, i) => <TableItemAddress address={address} key={i}
                                                                                 id={item.id} symbol={item.symbol}/>)
    return (
        <div className={styles.tableItem}>
            <div className={styles.tableHeader}>
                <img src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${item.id}.png`} alt={item.name}/>
                <span className={styles.title}>
                        {item.name}
                    </span>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} classStyles={'w-40'}/>
                <Button onClick={submitAddress} classStyles={'btn-gre'}>Push</Button>
                <Button classStyles={'btn-red'} onClick={removeItem}>Delete</Button>
            </div>
            {tableItemsAddress}
        </div>
    )
})

export const Table = () => {
    const {tableData}: any = useContext(Storage)
    const tableItems = tableData.map((el: TableType, index: number) => <TableItem item={el} key={index}/>)
    return (
        <div className={styles.table}>
            {tableItems}
        </div>
    )
}

