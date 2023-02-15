const adminUser = require('../models/userAdminModel')

exports.get = async (req, res, next) => {
    let user = req.body.user
    console.log("userAdminController")
    const data = await adminUser.selectUserAdmin(user)
    res.status(200).send(data);
};

