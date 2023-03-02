const adminTable = require('../models/adminStockModel')

exports.get = async (req, res, next) => {
    console.log("stockTableController")
    const data = await adminTable.viewAllRegistersStock()
    res.status(200).send(data);
};
