const express = require('express');
const router = express.Router();
const controller = require('../controllers/statusController')

router.post('/cpf', controller.getById);
router.put('/status/update/admin', controller.updateStatusByAdmin);

module.exports = router;