const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminCategoryController')

router.get('/all', controller.getAllCategory)
router.post('/add', controller.addCategory)

module.exports = router;