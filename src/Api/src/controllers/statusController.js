const statusView = require('../models/statusModel')

exports.getById = async (req, res) => {
     let cpfBody =  req.body.cpf
    console.log("statusControler")
    const data = await statusView.viewStatusCPF(cpfBody)
    console.log(`DataController ${[data][0]}`)
    dados =JSON.stringify([data])
    console.log(`dados tratados ${dados}`)
    return res.send(dados);
};