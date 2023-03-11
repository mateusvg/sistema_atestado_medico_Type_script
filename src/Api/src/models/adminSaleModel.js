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
let idSale = strGeneretor(10)

    async function saleInsert(values) {

        try {
            let idSales = 0
            let quantidade = -1
            const teste = await values[0].map(obj => [idSales, 1, obj.idStock, idSale]);
            console.log(JSON.stringify(teste))

            //INSERT into sales (idSales, quantidade, idStockProduct, idSale) VALUES (0,1,2,"RWQt9x1e4l"), (0,1,3,"RWQt9x1e4l");
            const query = 'INSERT into sales (idSales, quantidade, idStockProduct, idSale) VALUES ?'
            const result = await new Promise((resolve, reject) => {
                conn.query(query, [teste], (error, results, fields) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            })

            const updateTableStock = await new Promise((resolve, reject) => {
                conn.query('update stock set  quantidade = quantidade ?  where idStock = ?', [quantidade, teste.idStock], (error, results, fields) => {
                    if (error) return reject(error);
                    return resolve(results);
                })
            })
            console.log(`update stock table ${updateTableStock}`)
            let tratado = JSON.stringify(result)
            return tratado
        } catch (err) {
            console.log(err)
        }

    }


module.exports = { saleInsert }
