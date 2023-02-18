const conn = require('../db/connection')

async function viewAllRegistersTable() {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM form INNER JOIN statusporcpf ON statusporcpf.idtable1 = form.status; ', (error, results, fields) => {
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

async function countAllStatus() {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query("SELECT count(*) as status FROM form  WHERE STATUS =? UNION ALL SELECT count(*) as status FROM form WHERE STATUS = ? UNION ALL SELECT count(*) as status FROM form WHERE STATUS = ? ", [1, 2, 3], (error, results, fields) => {
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

async function getScheduleAdmin(date) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query("SELECT * FROM form WHERE scheduleDate = ?  ", [date], (error, results, fields) => {
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

module.exports = { viewAllRegistersTable, countAllStatus, getScheduleAdmin }

// SELECT * FROM `form` INNER JOIN `statusporcpf` ON `statusporcpf`.`idtable1` = `form`.`status` WHERE `form`.`CPF` ='787.571.100-26'
