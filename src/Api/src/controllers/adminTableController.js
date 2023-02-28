const adminTable = require('../models/adminTableModel')

exports.get = async (req, res, next) => {
    console.log("userAdminTableController")
    const data = await adminTable.viewAllRegistersTable()
    res.status(200).send(data);
};

exports.getCountStatus = async (req, res, next) => {
    console.log("userAdminTableGetStatusCountController")
    const data = await adminTable.countAllStatus()
    res.status(200).send(data);
};

exports.getSchedule = async (req, res, next) => {
    console.log("userAdminSchedule")
    let date = req.body
    const data = await adminTable.getScheduleAdmin(date)
    res.status(200).send(data);
};

exports.updateSchedute = async (req, res, next) => {
    console.log("userAdminUpdateSchedule")
    let date = req.body.date
    let nomePaciente = req.body.nomePaciente
    let cpf = req.body.cpf
    let phone = req.body.phone
    const data = await adminTable.updateScheduteAdmin(nomePaciente, date,cpf, phone)
    res.status(200).send(data);
};

exports.deleteSchedule = async (req, res, next) => {
    console.log("userAdminUpdateSchedule")
    let id = req.body.id
    const data = await adminTable.deleteScheduleModel(id)
    res.status(200).send(data);
};

exports.deleteTable = async (req, res, next) => {
    console.log("userAdminUpdateSchedule")
    let id = req.body.id
    const data = await adminTable.deleteTableModel(id)
    res.status(200).send(data);
};