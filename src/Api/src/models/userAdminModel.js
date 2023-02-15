const conn = require('../db/connection')

async function selectUserAdmin(user) {

    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * from adminuser WHERE adminuseremail = ? ', [user], (error, results, fields) => {
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
