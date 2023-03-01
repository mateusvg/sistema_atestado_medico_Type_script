const conn = require('../db/connection')

async function viewStatusCPF(cpf) {
    console.log(`CPF DO STATUS USER É ${cpf}`)
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM form INNER JOIN statusporcpf ON statusporcpf.idtable1 = form.status WHERE form.CPF = ?', [cpf], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(result)

        console.log(result[0].Status)
        let tratado = JSON.stringify(result[0].Status)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

async function updateStatusAdmin(status, cpf) {
    try {
        console.log(status)
        console.log(cpf)
        const result = await new Promise((resolve, reject) => {
            conn.query('UPDATE form SET status = ? WHERE cpf = ?', [status, cpf], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    } catch (err) {
        console.log(err)
    }
}
module.exports = { viewStatusCPF, updateStatusAdmin }



// SELECT * FROM `form` INNER JOIN `statusporcpf` ON `statusporcpf`.`idtable1` = `form`.`status` WHERE `form`.`CPF` ='787.571.100-26'
