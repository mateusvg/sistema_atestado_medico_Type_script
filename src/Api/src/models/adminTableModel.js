const conn = require('../db/connection')

async function viewAllRegistersTable() {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM form INNER JOIN statusporcpf ON statusporcpf.idtable1 = form.status; ', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        //console.log(result)
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
    console.log(`Data é ${date}` )
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query("SELECT * FROM schedule WHERE scheduleDate = ?  ", [date], (error, results, fields) => {
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

async function updateScheduteAdmin(nomePaciente, date, cpf, phone) {
    try {
        let idSchedule = ''
        let status = 'Agendado'
        const result = await new Promise((resolve, reject) => {
            conn.query("INSERT INTO schedule VALUES (?, ?, ?, ?, ?, ?)  ", [idSchedule, nomePaciente, cpf, date, phone, status], (error, results, fields) => {
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

async function updateScheduleStatusApointment(idSchedule, status) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query("UPDATE schedule set status = ? where idSchedule = ?  ", [status, idSchedule], (error, results, fields) => {
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


async function deleteScheduleModel(idSchedule) {
    try {
        const result = await new Promise((resolve, reject) => {
            console.log("id"+ idSchedule)
            conn.query("DELETE FROM schedule WHERE idSchedule = ?  ", [idSchedule], (error, results, fields) => {
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

async function deleteTableModel(idForm) {
    try {
        const result = await new Promise((resolve, reject) => {
            console.log("id"+ idForm)
            conn.query("DELETE FROM form WHERE idForm = ?  ", [idForm], (error, results, fields) => {
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

module.exports = { viewAllRegistersTable, countAllStatus, getScheduleAdmin, updateScheduteAdmin, deleteScheduleModel, deleteTableModel, updateScheduleStatusApointment }

// SELECT * FROM `form` INNER JOIN `statusporcpf` ON `statusporcpf`.`idtable1` = `form`.`status` WHERE `form`.`CPF` ='787.571.100-26'
