const adminSale = require('../models/adminCategoryModel')

exports.addCategory = async (req, res, next) => {
    console.log("add Category")
    let nomeCategoria = req.body.nomeCategoria
    console.log(`PAYLOAD CATEGORY ${nomeCategoria}`)
    const data = await adminSale.addCategory(nomeCategoria)
    res.status(200).send(data);
};
