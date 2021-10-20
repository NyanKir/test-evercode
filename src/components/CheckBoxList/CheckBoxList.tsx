import React, {ChangeEvent, useCallback, useContext, useEffect, useState} from "react";
import styles from './CheckBoxlist.module.scss'
import {Button} from "../Button/Button";
import {Storage} from "../../Context";

import {TableType} from "../../types";

type CheckBoxListProps = {
    data: any
}

export const CheckBoxList = React.memo(({data: list}: CheckBoxListProps) => {
    const [toggle, setToggle] = useState(false)
    const {tableData, setTableData}: any = useContext(Storage)
    const tableIds = tableData.map((el: TableType) => el.id)


    const disableModal = useCallback(() => setToggle(false), [])

    useEffect(() => {
        if (toggle) {
            document.addEventListener('click', disableModal)
            return
        }
        document.removeEventListener('click', disableModal)
        return () => {
            document.removeEventListener('click', disableModal)
        }
    }, [toggle])

    const handler = (e: ChangeEvent<HTMLInputElement>, id: number, rank: number, name: string, symbol: string) => {
        if (e.target.checked) {
            setTableData((state: TableType[]) => [...state,
                {
                    id,
                    name,
                    symbol,
                    rank,
                    address: []
                }
            ])
            return
        }
        setTableData((state: TableType[]) => state.filter(el => el.id !== id))
    }
    return (
        <div className={styles.dropdown}>
            <Button onClick={(e) => {
                setToggle(st => !st)
                e.stopPropagation()
            }}>{!toggle ? 'Add crypto' : 'Close'}</Button>

            {
                toggle && <div className={styles.content} onClick={e => e.stopPropagation()}>
                    {
                        list.map((el: any, i: number) => {
                            return (
                                <label htmlFor="" key={i} className={styles.item}>
                                    <input type='checkbox' className={styles.checkbox}
                                           onChange={(e) => handler(e, el.id, el.rank, el.name, el.symbol)}
                                           checked={tableIds.includes(el.id)}
                                    />
                                    <span className={styles.title}>
                                    {el.name}
                                        <span className={styles.subTitle}>
                                        {el.symbol}
                                    </span>
                                </span>
                                </label>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
})
