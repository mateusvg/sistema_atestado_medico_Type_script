const adminUser = require('../models/userAdminModel')

exports.get = async (req, res, next) => {
    console.log("userAdminController")
    const data = await adminUser.selectUserAdmin()
    res.status(200).send(data);
};

