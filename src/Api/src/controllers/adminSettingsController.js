const adminTable = require('../models/adminSettingsModel')

exports.get = async (req, res, next) => {
    console.log("userAdminSettings")
    const data = await adminTable.viewUserSettings()
    res.status(200).send(data);
};
