const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminTableController')

router.get('/', controller.get);
router.get('/status/count', controller.getCountStatus);
router.post('/schedule', controller.getSchedule);
router.put('/schedule/date', controller.updateSchedute)
router.delete('/schedule/delete', controller.deleteSchedule)

module.exports = router;