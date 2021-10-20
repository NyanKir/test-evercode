const express = require('express')
const app = express()
const fs = require('fs')
require('dotenv').config({path: '../.env'});

app.use(express.json());

app.post('/api/write/CSV', function (req, res) {
    const request = req.body
    const include = request.some((el) => !el.address.length)
    if (include) {
        return res.status(400).json({error: 'Push some addresses'}).end()
    }

    const header = ['Id', 'Name', 'Symbol', 'Address', 'Balance']
    const result = request.map((item) => {
        let result = []
        const init = [item.id, item.name, item.symbol]
        item.address.forEach((address) => {
            if (address.hasOwnProperty('error')) {
                delete address.error
            }
            result.push([...init, ...Object.values(address)])
        })
        return result
    })

    const normalize = []
    result.forEach((crypto) => {
        normalize.push(...crypto)
    })
    const data = [
        header,
        ...normalize
    ];


    let body = '';
    const filePath = __dirname + '\\data.csv';
    data.forEach(function (item) {
        const string = item.map(function (field) {
            return '"' + field.toString().replace(/\"/g, '""') + '"';
        }).toString() + '\r\n'

        body += string
    });
    fs.writeFile(filePath, body, function () {
        res.end();
    });

})

app.get('/api/download', function (req, res) {
    res.download(__dirname + '\\data.csv', 'data.csv',);
})

const port = process.env.SERVER_PORT
app.listen(3333, function () {
    console.log('Server listening on ' + 3333)
})