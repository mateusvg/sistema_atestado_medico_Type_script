const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminSettingsController')

router.get('/admin/settings', controller.get);
//router.put('/admin/settings', controller.updateUserSettings)

module.exports = router;