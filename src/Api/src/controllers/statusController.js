const statusView = require('../models/statusModel')

exports.getById = async (req, res) => {
    let cpfBody = req.body.cpf
    console.log(`cpfBODY = ${cpfBody}`)
    console.log("statusControler")
    const data = await statusView.viewStatusCPF(cpfBody)
    console.log(`DataController ${[data][0]}`)
    dados = JSON.stringify([data])
    console.log(`dados tratados ${dados}`)
    return res.send(dados);
};

exports.updateStatusByAdmin = async (req, res) => {
    let status = req.body.status
    let cpf = req.body.cpf
    console.log("statusControlerUpdateByAdmin")
    const data = await statusView.updateStatusAdmin(status, cpf)
    return res.sendStatus(200)
};