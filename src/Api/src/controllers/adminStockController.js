const adminTable = require('../models/adminStockModel')

exports.get = async (req, res, next) => {
    console.log("stockTableController")
    const data = await adminTable.viewAllRegistersStock()
    res.status(200).send(data);
};

exports.getTotalStockProducts = async (req, res, next) => {
    console.log("countTotalStockProducts")
    const data = await adminTable.viewAllProductsStock()
    res.status(200).send(data);
};

exports.updateProductAttributes = async (req, res, next) => {
    console.log("updateProductsStockAttributes")
    let nome = req.body.nome
    let preco = req.body.preco
    let quantidade = req.body.quantidade
    let idStock = req.body.idStock
    const data = await adminTable.updateProductAttributes(nome, preco, quantidade, idStock)
    res.status(200).send(data);
};
