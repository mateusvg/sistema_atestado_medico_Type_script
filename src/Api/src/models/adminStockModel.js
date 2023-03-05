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

async function viewAllProductsStock() {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT SUM(quantidade + 0) as total FROM stock', (error, results, fields) => {
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

async function getTotalStockProductsPrice() {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT SUM(preco + 0) as precoTotal, SUM(quantidade + 0)  as quantTotal  FROM stock', (error, results, fields) => {
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

async function updateProductAttributes(nome, preco, quantidade, idStock, statusProduto) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query("UPDATE stock set nome = ?, preco = ?, quantidade = ?, statusItens_idstatusItens = ?  where idStock = ?  ", [nome, preco, quantidade, statusProduto, idStock], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

async function insertProductStock(nome, foto, preco, quantidade, statusProduto) {
    let IdStock = ''
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query("INSERT INTO stock VALUES (?, ?, ?, ?, ?, ?)", [IdStock, nome, foto, preco, quantidade, statusProduto], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

async function deleteProductStock(id) {
    try {
        const result = await new Promise((resolve, reject) => {
            console.log("id product"+ id)
            conn.query("DELETE FROM stock WHERE idStock = ?  ", [id], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}


module.exports = { viewAllRegistersStock, viewAllProductsStock, updateProductAttributes, getTotalStockProductsPrice, insertProductStock, deleteProductStock }

// SELECT * FROM `form` INNER JOIN `statusporcpf` ON `statusporcpf`.`idtable1` = `form`.`status` WHERE `form`.`CPF` ='787.571.100-26'
