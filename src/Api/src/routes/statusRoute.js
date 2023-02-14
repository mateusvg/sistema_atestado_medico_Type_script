const express = require('express');
const router = express.Router();
const controller = require('../controllers/statusController')

router.post('/cpf', controller.getById);

module.exports = router;