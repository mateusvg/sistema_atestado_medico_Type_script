const conn = require('../db/connection')

async function viewUserSettings() {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM adminuser where id =? ',[id], (error, results, fields) => {
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