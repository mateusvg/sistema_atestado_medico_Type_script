const formModel = require('../models/formModel')

exports.post = async(req, res, next) => {
    let idForm = 0
    let nomePacienteBody = req.body.nomePaciente
    let cpfBody =  req.body.cpf
    let nomeMedicoBody = req.body.nomeMedico
    let dataBody = req.body.data
    let aptidaoBody = req.body.aptidao
    let anexo = req.body.postImage.myFile
    console.log("formController")
    const data = await formModel.insertform(idForm, nomePacienteBody, cpfBody,nomeMedicoBody, dataBody, aptidaoBody, anexo)
    res.status(201).send('Formulario recebido com sucesso');
};
