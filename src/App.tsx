import React, { useMemo, useState} from 'react';
import {CheckBoxList} from "./components/CheckBoxList/CheckBoxList";
import {Table} from "./components/Table";
import {Context} from "./Context";
import {TableType} from "./types";
import {Button} from "./components/Button/Button";

function App() {
    console.log()
    const data = useMemo(() => [
        {
            "id": 131,
            "name": "Dash",
            "symbol": "DASH",
            "slug": "dash",
            "rank": 63,
            "is_active": 1,
            "first_historical_data": "2014-02-14T13:44:09.000Z",
            "last_historical_data": "2021-10-17T17:39:03.000Z",
            "platform": null
        },
        {
            "id": 1,
            "name": "Bitcoin",
            "symbol": "BTC",
            "slug": "bitcoin",
            "rank": 1,
            "is_active": 1,
            "first_historical_data": "2013-04-28T18:47:21.000Z",
            "last_historical_data": "2021-10-17T17:39:02.000Z",
            "platform": null
        },
        {
            "id": 1027,
            "name": "Ethereum",
            "symbol": "ETH",
            "slug": "ethereum",
            "rank": 2,
            "is_active": 1,
            "first_historical_data": "2015-08-07T14:49:30.000Z",
            "last_historical_data": "2021-10-17T17:39:02.000Z",
            "platform": null
        },
        {
            "id": 74,
            "name": "Dogecoin",
            "symbol": "DOGE",
            "slug": "dogecoin",
            "rank": 10,
            "is_active": 1,
            "first_historical_data": "2013-12-15T14:42:34.000Z",
            "last_historical_data": "2021-10-17T17:39:03.000Z",
            "platform": null
        },
        {
            "id": 2,
            "name": "Litecoin",
            "symbol": "LTC",
            "slug": "litecoin",
            "rank": 15,
            "is_active": 1,
            "first_historical_data": "2013-04-28T18:47:22.000Z",
            "last_historical_data": "2021-10-17T17:39:02.000Z",
            "platform": null
        },
    ], [])
    const [loadStatus, setLoadStatus] = useState(false)
    const [tableData, setTableData] = useState<Array<TableType>>([])

    const getBalances = async () => {
        if (!tableData.length) {
            alert('Select crypto')
            return
        }
        tableData.forEach((crypto) => {
            const addresses = crypto.address.map(el => el.value).join(';')
            if (!addresses) {
                alert('Push addresses for ' + crypto.name)
                return
            }
            const url = `https://api.blockcypher.com/v1/${crypto.symbol.toLowerCase()}/main/addrs/${addresses}/balance`
            setLoadStatus(true)
            fetch(url).then(r => r.json()).then(data => {
                const instance = [...crypto.address]
                if (!Array.isArray(data)) {
                    data = [data]
                }
                data.forEach((el: any, i: number) => {
                    if (el.hasOwnProperty('error')) {
                        instance[i].error = el.error
                        instance[i].balance = 0
                    } else {
                        instance[i].balance = el.balance
                    }
                })
                return instance
            }).then((instance) => {
                setTableData(state => state.map((item) => {
                    if (item.id === crypto.id) {
                        item.address = instance
                    }
                    return item
                }))
                setLoadStatus(false)
            })
        })
    }

    const value = useMemo(
        () => ({tableData, setTableData}),
        [tableData]
    );

    const writeCSV = async () => {
        if (!tableData.length) {
            alert('Select crypto')
            return
        }
        try {
            const response = await fetch('/write/CSV', {
                method: 'post',
                body: JSON.stringify(tableData),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if(response.status===200){
                window.open(`${process.env.REACT_APP_SERVER_HOST}/api/download`)
            }
        }catch (e) {
            alert('Error: '+e)
        }

    }
    return (
        <div className="container">
            <Context value={{...value}}>
                <div>
                    <CheckBoxList data={data}/>
                    <Button classStyles={'btn-green'}
                            onClick={getBalances}
                            disabled={loadStatus}
                    >{!loadStatus ? 'Get Balance' : 'Loading...'}</Button>
                    <Button classStyles={'btn-warning'} onClick={writeCSV}>Export</Button>
                </div>
                <Table/>
            </Context>
        </div>
    );
}

export default App;
