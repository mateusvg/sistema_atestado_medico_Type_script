const adminSale = require('../models/adminSaleModel')

exports.insertSale = async (req, res, next) => {
    console.log("insert Sale")
    let values = req.body
    console.log(`valores insert ${values}`)
    const data = await adminSale.saleInsert(values)
    res.status(200).send(data);
};
