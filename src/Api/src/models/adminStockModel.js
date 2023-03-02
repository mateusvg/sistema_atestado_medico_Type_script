const conn = require('../db/connection')

async function viewAllRegistersStock() {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM stock INNER JOIN statusitens ON statusitens.idstatusItens = stock.statusItens_idstatusItens; ', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(result)
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }

}


module.exports = { viewAllRegistersStock}

// SELECT * FROM `form` INNER JOIN `statusporcpf` ON `statusporcpf`.`idtable1` = `form`.`status` WHERE `form`.`CPF` ='787.571.100-26'
