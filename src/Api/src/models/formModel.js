const conn = require('../db/connection')

async function insertform(idForm, nomePacienteBody, cpfBody, nomeMedicoBody, dataBody, aptidaoBody, anexo) {
    let status = "1"
    try {
        const result = await new Promise((resolve, reject) => {
            console.log('postFormModel')
            conn.query('INSERT INTO form (`idForm`, `nomePaciente`, `CPF`, `nomeMedico`, `data`, `aptidao`, `anexo`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',[idForm, nomePacienteBody, cpfBody ,nomeMedicoBody ,dataBody ,aptidaoBody ,anexo, status], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

        return result
    } catch (err) {
        console.log(err)
    }

}

module.exports = { insertform }