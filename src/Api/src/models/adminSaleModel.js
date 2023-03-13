const conn = require('../db/connection')

const strGeneretor = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


let date = new Date()
date = date.toISOString().split('T')[0]

async function saleInsert(values) {
    let quantidadesStockUpdate = values
    let idSale = strGeneretor(10)

    try {
        let idSales = 0
        const insertValues = await values[0].map(obj => [idSales, 1, obj.idStock, idSale, date]);
        console.log(JSON.stringify(insertValues))

        const query = 'INSERT into sales (idSales, quantidade, idStockProduct, idSale, date) VALUES ?'
        await new Promise((resolve, reject) => {
            conn.query(query, [insertValues], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        })
        
        let quantidade = -1
        const updateStockQuantity = await quantidadesStockUpdate[0].map(obj => [obj.idStock]);
        await new Promise((resolve, reject) => {
            updateStockQuantity.forEach(function (item) {
                conn.query('update stock set  quantidade = quantidade ?  where idStock = ?', [quantidade, item], (error, results, fields) => {
                    if (error) return reject(error);
                    return resolve(results);
                })
            })
        })

    } catch (err) {
        console.log(err)
    }
}
module.exports = { saleInsert }
