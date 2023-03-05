const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminStockController')

router.get('/', controller.get);
router.get('/products', controller.getTotalStockProducts);
router.get('/products/total', controller.getTotalStockProductsPrice);
router.put('/products/update', controller.updateProductAttributes)
router.post('/products/add', controller.insertProductStock)
router.delete('/products/delete', controller.deleteProductStock)

module.exports = router;