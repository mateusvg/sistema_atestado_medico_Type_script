const conn = require('../db/connection')

async function addCategory(categoryName) {
    let categoryCol = categoryName
    let id = 0

    try {
        const result = await new Promise((resolve, reject) => {
            //INSERT INTO `atestado_medico`.`Category` (`idCategory`, `Categorycol`) VALUES (1, 'Categoria Teste');

            conn.query("INSERT INTO category VALUES (?, ?)  ", [id, categoryCol], (error, results, fields) => {
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

async function getAllCategory(categoryName) {
    let categoryCol = categoryName
    let id = 0

    try {
        const result = await new Promise((resolve, reject) => {
            //INSERT INTO `atestado_medico`.`Category` (`idCategory`, `Categorycol`) VALUES (1, 'Categoria Teste');

            conn.query("SELECT * from category", (error, results, fields) => {
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

module.exports = { addCategory, getAllCategory }