const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminSaleStockController')

router.put('/products/sale', controller.insertSale)

module.exports = router;