const conn = require('../db/connection')

async function selectUserAdmin() {

    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * from adminuser', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

        return result
    } catch (err) {
        console.log(err)
    }

}

module.exports = { selectUserAdmin }
