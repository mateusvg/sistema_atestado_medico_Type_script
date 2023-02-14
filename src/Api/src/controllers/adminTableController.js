const adminTable = require('../models/adminTableModel')

exports.get = async (req, res, next) => {
    console.log("userAdminController")
    const data = await adminTable.viewAllRegistersTable()
    res.status(200).send(data);
};
