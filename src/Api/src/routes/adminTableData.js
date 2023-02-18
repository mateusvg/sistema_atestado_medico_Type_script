const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminTableController')

router.get('/', controller.get);
router.get('/status/count', controller.getCountStatus);
router.post('/schedule', controller.getSchedule);

module.exports = router;