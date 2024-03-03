const express = require('express');
const dataController = require('../controllers/datacontroller');

const router = express.Router();

router.get('/data', dataController.getData);

module.exports = router;
