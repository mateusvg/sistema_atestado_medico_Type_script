const adminTable = require('../models/adminTableModel')

exports.get = async (req, res, next) => {
    console.log("userAdminTableController")
    const data = await adminTable.viewAllRegistersTable()
    res.status(200).send(data);
};

exports.getCountStatus = async (req, res, next) => {
    console.log("userAdminTableController")
    const data = await adminTable.countAllStatus()
    res.status(200).send(data);
};

exports.getSchedule = async (req, res, next) => {
    console.log("userAdminSchadule")
    let date = req.body.date
    const data = await adminTable.getScheduleAdmin(date)
    res.status(200).send(data);
};