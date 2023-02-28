const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminTableController')

router.get('/', controller.get);
router.get('/status/count', controller.getCountStatus);
router.delete('/delete', controller.deleteTable)
router.post('/schedule', controller.getSchedule);
router.put('/schedule/date', controller.updateSchedute)
router.put('/schedule/status', controller.updateScheduteStatus)
router.delete('/schedule/delete', controller.deleteSchedule)

module.exports = router;