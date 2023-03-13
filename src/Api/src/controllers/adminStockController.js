const adminStock = require('../models/adminStockModel')

exports.get = async (req, res, next) => {
    console.log("stockTableController")
    const data = await adminStock.viewAllRegistersStock()
    res.status(200).send(data);
};

exports.getStatusActive = async (req, res, next) => {
    console.log("stockTableControllerStatusActive")
    const data = await adminStock.viewAllRegistersStockStatusActive()
    res.status(200).send(data);
};


exports.getTotalStockProducts = async (req, res, next) => {
    console.log("countTotalStockProducts")
    const data = await adminStock.viewAllProductsStock()
    res.status(200).send(data);
};

exports.getTotalStockProductsPrice = async (req, res, next) => {
    console.log("countTotalStockProductsPrice")
    const data = await adminStock.getTotalStockProductsPrice()
    res.status(200).send(data);
};


exports.updateProductAttributes = async (req, res, next) => {
    console.log("updateProductsStockAttributes")
    let nome = req.body.nome
    let preco = req.body.preco
    let quantidade = req.body.quantidade
    let idStock = req.body.idStock
    let statusProduto = req.body.status
    let idCategoria = req.body.nomeCategoria
    console.log(`o STATUS DO PRODUTO E ${statusProduto}`)
    const data = await adminStock.updateProductAttributes(nome, preco, quantidade, idStock, statusProduto, idCategoria)
    res.status(200).send(data);
};

exports.insertProductStock = async (req, res, next) => {
    console.log("insertProductsStockAttributes")
    let nome = req.body.nome
    let foto = req.body.foto.foto
    //console.log(foto)
    let preco = req.body.preco
    let quantidade = req.body.quantidade
    let statusProduto = req.body.status
    let idCategoria = req.body.nomeCategoria
    const data = await adminStock.insertProductStock(nome, foto, preco, quantidade, statusProduto, idCategoria)
    res.status(200).send(data);
};

exports.deleteProductStock = async (req, res, next) => {
    console.log("deleteProductStock")
    let id = req.body.id
    const data = await adminStock.deleteProductStock(id)
    res.status(200).send(data);
};