const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'atestado_medico' 
});
module.exports = conn;