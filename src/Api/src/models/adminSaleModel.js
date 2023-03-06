const conn = require('../db/connection')

async function saleInsert(values) {
    console.log(JSON.stringify(values[0][0].idStock))
    let idStock = values[0][0].idStock
    let idSales = 0
    let quantidade = -1
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('INSERT into sales  VALUES (?, ?, ?)',[ idSales, 1,idStock ], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        const updateTableStock = await new Promise((resolve, reject) => {
            conn.query('update stock set  quantidade = quantidade ?  where idStock = ?',[ quantidade , idStock ], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(result)
        console.log(`update stock table ${updateTableStock}`)
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }

}


module.exports = { saleInsert }
